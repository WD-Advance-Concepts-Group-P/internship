# Internship Finder - Project at JU

This repository contains both planning and executing of a project made in the course [iOS Development](https://ju.se/en/study-at-ju/courses.html?courseCode=TFWN19&semester=20201&lang=en) at [Jönköping University](https://www.ju.se/en/) in Sweden. The project is made by us in this team/organization, all currently studying the programme **Bachelor of Science in Computer Engineering**.

**Team:**
[@Warcaith](https://github.com/Warcaith), 
[@EduM22](https://github.com/EduM22), 

Brief
---

Features
---

Docker
---
### Running the migrations within Docker

1. Start up **Docker** and then set up the project's containers with the included "*run.sh*" shell script.
2. Open up another terminal and run the command "*docker ps*" to get information about the running containers.
3. Check for the name of the container where the web-app is running:

![alt text](https://i.imgur.com/LoEkgh2.png "docker ps commando")

4. Run the command "*docker exec -it <container name> /bin/bash*" to enter the container's terminal.
5. Run the command "*npx sequelize db:migrate*" to start the migration.
