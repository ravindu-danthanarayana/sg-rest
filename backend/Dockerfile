FROM ballerina/ballerina:2201.9.0 AS build
WORKDIR /home/ballerina
COPY Ballerina.toml ./
COPY restaurant_api.bal ./
RUN bal build --offline || bal build

FROM ballerina/jvm-runtime:21
WORKDIR /home/ballerina
COPY --from=build /home/ballerina/target/bin/restaurant_api.jar ./app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
