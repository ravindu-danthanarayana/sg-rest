// Sungreen Habarana Restaurant — Ballerina REST API
// Endpoints:
//   GET    /api/menu                GET /api/menu/{id}
//   POST   /api/menu (admin)        PUT /api/menu/{id} (admin)   DELETE /api/menu/{id} (admin)
//   POST   /api/reservations        GET /api/reservations (admin)
//   PUT    /api/reservations/{id} (admin)   DELETE /api/reservations/{id} (admin)
//   POST   /api/contact             GET /api/contact (admin)
//   POST   /api/auth/login          POST /api/auth/logout

import ballerina/http;
import ballerina/sql;
import ballerina/time;
import ballerina/log;
import ballerina/crypto;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
import ballerina/jwt;
import ballerina/regex;

// ---------- Configuration ----------
configurable string DB_HOST   = "localhost";
configurable int    DB_PORT   = 3306;
configurable string DB_USER   = "root";
configurable string DB_PASS   = "root";
configurable string DB_NAME   = "sungreen";
configurable string JWT_SECRET = "change-me-in-production-please-32chars";
configurable int    JWT_TTL_SECONDS = 3600;

// ---------- DB Client ----------
final mysql:Client dbClient = check new (
    host = DB_HOST, port = DB_PORT, user = DB_USER, password = DB_PASS, database = DB_NAME
);

// ---------- Types ----------
public type MenuItem record {|
    int id?;
    string name;
    string description;
    decimal price;
    string category;
    string? image_url;
    boolean available = true;
    string created_at?;
|};

public type Reservation record {|
    int id?;
    string customer_name;
    string email;
    string phone;
    string reservation_date;
    string reservation_time;
    int guests;
    string? special_request;
    string status = "pending";
    string created_at?;
|};

public type ContactMessage record {|
    int id?;
    string name;
    string email;
    string message;
    string created_at?;
|};

public type LoginRequest record {| string username; string password; |};
public type TokenResponse record {| string token; int expiresIn; |};

// ---------- CORS ----------
@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization"],
        maxAge: 86400
    }
}
service /api on new http:Listener(8080) {

    // ============ MENU ============
    resource function get menu() returns MenuItem[]|error {
        stream<MenuItem, sql:Error?> rs = dbClient->query(`SELECT * FROM menu_items ORDER BY id`);
        return from MenuItem m in rs select m;
    }

    resource function get menu/[int id]() returns MenuItem|http:NotFound|error {
        MenuItem|sql:Error r = dbClient->queryRow(`SELECT * FROM menu_items WHERE id=${id}`);
        if r is sql:NoRowsError { return http:NOT_FOUND; }
        return r;
    }

    resource function post menu(http:Request req, @http:Payload MenuItem item) returns MenuItem|http:Unauthorized|error {
        check ensureAdmin(req);
        sql:ExecutionResult res = check dbClient->execute(`
            INSERT INTO menu_items(name, description, price, category, image_url, available)
            VALUES(${item.name}, ${item.description}, ${item.price}, ${item.category}, ${item.image_url}, ${item.available})
        `);
        item.id = <int>res.lastInsertId;
        return item;
    }

    resource function put menu/[int id](http:Request req, @http:Payload MenuItem item) returns MenuItem|http:Unauthorized|error {
        check ensureAdmin(req);
        _ = check dbClient->execute(`
            UPDATE menu_items SET name=${item.name}, description=${item.description}, price=${item.price},
              category=${item.category}, image_url=${item.image_url}, available=${item.available}
            WHERE id=${id}
        `);
        item.id = id;
        return item;
    }

    resource function delete menu/[int id](http:Request req) returns http:Ok|http:Unauthorized|error {
        check ensureAdmin(req);
        _ = check dbClient->execute(`DELETE FROM menu_items WHERE id=${id}`);
        return http:OK;
    }

    // ============ RESERVATIONS ============
    resource function post reservations(@http:Payload Reservation r) returns Reservation|http:BadRequest|error {
        if r.customer_name.length() < 2 || !isEmail(r.email) || r.guests < 1 {
            return http:BAD_REQUEST;
        }
        sql:ExecutionResult res = check dbClient->execute(`
            INSERT INTO reservations(customer_name, email, phone, reservation_date, reservation_time, guests, special_request, status)
            VALUES(${r.customer_name}, ${r.email}, ${r.phone}, ${r.reservation_date}, ${r.reservation_time}, ${r.guests}, ${r.special_request}, 'pending')
        `);
        r.id = <int>res.lastInsertId;
        return r;
    }

    resource function get reservations(http:Request req) returns Reservation[]|http:Unauthorized|error {
        check ensureAdmin(req);
        stream<Reservation, sql:Error?> rs = dbClient->query(`SELECT * FROM reservations ORDER BY created_at DESC`);
        return from Reservation x in rs select x;
    }

    resource function put reservations/[int id](http:Request req, @http:Payload record {| string status; |} body) returns http:Ok|http:Unauthorized|error {
        check ensureAdmin(req);
        _ = check dbClient->execute(`UPDATE reservations SET status=${body.status} WHERE id=${id}`);
        return http:OK;
    }

    resource function delete reservations/[int id](http:Request req) returns http:Ok|http:Unauthorized|error {
        check ensureAdmin(req);
        _ = check dbClient->execute(`DELETE FROM reservations WHERE id=${id}`);
        return http:OK;
    }

    // ============ CONTACT ============
    resource function post contact(@http:Payload ContactMessage m) returns ContactMessage|http:BadRequest|error {
        if m.name.length() < 2 || !isEmail(m.email) || m.message.length() < 5 {
            return http:BAD_REQUEST;
        }
        sql:ExecutionResult res = check dbClient->execute(`
            INSERT INTO contact_messages(name, email, message) VALUES(${m.name}, ${m.email}, ${m.message})
        `);
        m.id = <int>res.lastInsertId;
        return m;
    }

    resource function get contact(http:Request req) returns ContactMessage[]|http:Unauthorized|error {
        check ensureAdmin(req);
        stream<ContactMessage, sql:Error?> rs = dbClient->query(`SELECT * FROM contact_messages ORDER BY created_at DESC`);
        return from ContactMessage x in rs select x;
    }

    // ============ AUTH ============
    resource function post auth/login(@http:Payload LoginRequest body) returns TokenResponse|http:Unauthorized|error {
        record {| int id; string username; string password_hash; |}|sql:Error row =
            dbClient->queryRow(`SELECT id, username, password_hash FROM admins WHERE username=${body.username}`);
        if row is sql:Error { return http:UNAUTHORIZED; }

        boolean ok = check crypto:verifyBcrypt(body.password, row.password_hash);
        if !ok { return http:UNAUTHORIZED; }

        jwt:IssuerConfig cfg = {
            username: row.username,
            issuer: "sungreen",
            audience: "sungreen-admin",
            expTime: <decimal>JWT_TTL_SECONDS,
            signatureConfig: { algorithm: jwt:HS256, config: JWT_SECRET }
        };
        string token = check jwt:issue(cfg);
        return { token: token, expiresIn: JWT_TTL_SECONDS };
    }

    resource function post auth/logout() returns http:Ok {
        // Stateless JWT: client discards the token.
        return http:OK;
    }
}

// ---------- Helpers ----------
function ensureAdmin(http:Request req) returns error? {
    string|http:HeaderNotFoundError auth = req.getHeader("Authorization");
    if auth is http:HeaderNotFoundError { return error("Unauthorized"); }
    if !auth.startsWith("Bearer ") { return error("Unauthorized"); }
    string token = auth.substring(7);

    jwt:ValidatorConfig vc = {
        issuer: "sungreen",
        audience: "sungreen-admin",
        signatureConfig: { secret: JWT_SECRET }
    };
    jwt:Payload _ = check jwt:validate(token, vc);
}

function isEmail(string s) returns boolean {
    return regex:matches(s, "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$");
}

public function main() {
    time:Utc now = time:utcNow();
    log:printInfo("Sungreen API started at " + time:utcToString(now));
}
