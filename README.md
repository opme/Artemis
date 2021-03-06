# Artemis

**1) Add dataset**

Add a `data` folder to the project root, next to the `src` folder.
Add a CSV file representing each OMOP CDM v5 table (e.g. death.csv consisting of person_id,death_date,death_type_concept_id,cause_concept_id,cause_source_value,cause_source_concept_id)

This folder should consist of `data/death.csv`, `data/person.csv` and so on for each OMOP table, as defined here http://www.ohdsi.org/web/wiki/doku.php?id=documentation:cdm:single-page

For a comprehensive sample dataset, please use ftp://ftp.ohdsi.org/synpuf/synpuf_1.zip. Note, you'll have to remove the trailing `_1` from the filenames (e.g. `death_1.csv` -> `death.csv`)

**2) Start the server**

From the project root, run the following command:

Mac

`sbt/sbt compile run`

Windows

`sbt\sbt.bat compile run`

Note, this may take a few minutes as the server has to reformat the CSV data into a more optimal format. This cost only occurs the first time the server is started. 

**3) Install client dependencies**

Install node.js and the node package manager command line utilities 
https://nodejs.org/en/
https://www.npmjs.com/

Navigate to the client folder and run `npm install` to install client dependencies

**4) Start the client**

Start the client by running `npm start` from the client folder


**5) View the application**

Open the Chrome browser and navigate to `http://localhost:3000/`
