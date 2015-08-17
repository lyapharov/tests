FROM java:8-jre
COPY ./settings.yml /parley-client/
COPY ./example.keystore /parley-client/
COPY ./target/client-proxy-service-0.1.jar /parley-client/
EXPOSE 8080
WORKDIR /parley-client
CMD java -jar -Done-jar.silent=true client-proxy-service-0.1.jar db migrate settings.yml && java -jar -Done-jar.silent=true client-proxy-service-0.1.jar server settings.yml
