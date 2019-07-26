Creating a geomap visualization of earthquake and tetonic plates data provided by the United States Geological Survey (USGS) via https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php.
<hr>
Languages used: JavaScript, HTML5, CSS

![USGS Logo Cover](https://raw.githubusercontent.com/kiseki1107/leaflet_geomapping/master/Images/USGS_logo.png)

# USGS Earthquake Geomapping and Leaflet Data Visualization
This data visualization project seeks to capture earthquake occurences and patterns around the world with data provided by the United States Geological Survey ([USGS](https://www.usgs.gov/)). The USGS provides public scientific data that focuses on the issues of climate impact, natual hazards, and environment and ecological resources in the United States. Their discipline ranges from topics in biology, geography, geology, and hydrology.

## Table of Contents
* [Introduction](#Introduction)
  * [Methods](#Methods)
  * [Technologies](#Technologies)
  * [Dependencies](#Dependencies)
* [Data Collection](#DataCollection)
* [Data Cleaning](#DataCleaning)
* [Further Notes](#PresentationSlides)

<a name="Introduction"></a>
## Introduction
This is primarily an ETL (Extract-Transform-Load) project for data cleaning and data manipulation practices. The scope of this project is to obtain at least two different datasets (BoardGameGeek and KickStarter datasets from Kaggle in this case) to be cleaned up and organized into a single master table or dataFrame for possible further analyses.

Although board games (also known as tabletop games) have been around since the 1960s and 1970s (and probably even earlier!), there has been a resurface of the popularity of board games despite the rise of technology and video gaming among family and peers. The goal of this project is to analyze that rising trend in the 21st century.

<a name="Methods"></a>
### Methods
* Data Cleaning
* Data Manipulation
* ETL

<a name="Technologies"></a>
### Technologies
* Python
* MySQL

<a name="Dependencies"></a>
### Dependencies 
The following python libraries are used in this project:
```python
# For general Python dataFrame manipulation.
import pandas as pd

# For handling SQL files and imports into Python environments.
from sqlalchemy import create_engine, inspect
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
```

<a name="DataCollection"></a>
## Data Collection
[Click here for code reference.](https://github.com/kiseki1107/ETL/blob/master/ETL.ipynb)

The board game data has been extracted from BoardGameGeek’s data on their website via [Kaggle](https://www.kaggle.com/gabrio/board-games-dataset) of which a SQLite file was obtained. BoardGameGeek is a popular website that provides descriptions, rankings, and reviews for many board games. Kickstarter data, a website known for crowdsourcing projects (including board games), was also extracted from [Kaggle](https://www.kaggle.com/kemical/kickstarter-projects) of which a csv file was obtained.

In order to transform the datasets from BoardGameGeek’s SQLite file, SQLAlchemy was utilized. An engine and connector were created to connect to the SQLite file, and an inspector was created to get a quick overview of all related tables and table columns needed for analysis. The inspector provides a quick summary of the datasets for users to get a good sense of what is to be expected from the connected data.

Below is a snippet of the data collection via sqlalchemy. This technique can be performed with almost any dataset stored in a SQLite file.
```python
# Create the engine to collect the SQLite file dataset
engine = create_engine("sqlite:///board-games-dataset/database.sqlite")

# Create the connection
conn = engine.connect()

# Create the inspector
inspector = inspect(engine)

# Inspect the databases from the SQLite file
inspector.get_table_names()

# Inspect the columns for the BoardGames database
bg_columns = inspector.get_columns('BoardGames')
for column in bg_columns:
    print(column["name"], column["type"])
```

After inspection, the BoardGameGeek SQLite table was converted into a pandas dataFrame for further data manipulation and data cleaning process.

```python
# Convert SQLite dataset into pandas DataFrame
bgg_data = pd.read_sql("SELECT * FROM BoardGames", conn)
```

<a name="DataCleaning"></a>
## Data Cleaning
[Click here for code reference.](https://github.com/kiseki1107/ETL/blob/master/ETL.ipynb)

<p align="center">
<img width="250" height="200" src="https://raw.githubusercontent.com/kiseki1107/Rise-of-Board-Gaming-ETL-Data-Cleaning-Project/master/Images/boardgamegeek.png">
</p>

Once BoardGameGeek's SQLite file gets converted into a python dataFrame, cleaning functions such as **df.iloc** and **df.drop*** were used to clean up the table. **df.info()** was used to collect all the names of the columns to assist in dropping the unnecessary columns.

One thing to note was that the column names for the BoardGameGeek datasets had periods in the variable names, so every column had to be renamed by replacing “.” With “_” to make python coding much easier.

```python
# Convert the columns into python accessible variables by replacing . with _
bgg_data.columns = bgg_data.columns.str.replace(".", "_")
```

<p align="center">
<img width="250" height="200" src="https://raw.githubusercontent.com/kiseki1107/Rise-of-Board-Gaming-ETL-Data-Cleaning-Project/master/Images/kickstarter.png">
</p>

In the Kickstarter CSV file dataset, the file was converted into a python dataFrame with the pandas library.

```python
# Read the kickstart csv file and preview the data.
ks_data = pd.read_csv("ks-projects-201801.csv")
```

Since Kickstarter is known for projects other than just board games (tabletop in this case), **df.unique** was utilized to only identify tabletop categories, especially the ‘successful’ projects since failed projects will not help with this analysis. Further cleansing was performed to drop unnecessary columns in the Kickstarter DataFrame.

```python
# Preview the unique row variables to locate only successful board games on KickStarter.
ks_data.main_category.unique()

# Limit the KickStarter dataFrame to only 'Games' variables.
ks_game_cat = ks_data[ks_data.main_category == 'Games']

# Preview the unique row 'Games' variables to locate only 'Tabletop Games'.
ks_game_cat.category.unique()

# Limit the KickStarter dataFrame to only 'Tabletop Games' variables.
ks_boardgame = ks_data[ks_data.category == 'Tabletop Games']

# Limit the KickStarter dataFrame to only successful tabletop games.
ks_good_boardgame = ks_boardgame[ks_boardgame.state == 'successful']
```

Finally, both BoardGameGeek and Kickstarter DataFrames were combined via the **pd.merge()** function. In order to merge those two DataFrames, I had to make sure that the column names that describes each board game names were matching. So, the ‘name’ column from the Kickstarter DataFrame was changed to ‘details_name’ to match that of the BoardGameGeek column name. It is there that allows both DataFrames to be merged. Once completed, the combined DataFrame was loaded into an excel file called ‘output.xlsx’. Download and view the cleaned data file [here](https://github.com/kiseki1107/Rise-of-Board-Gaming-ETL-Data-Cleaning-Project/blob/master/output.xlsx).

```python
# Change the column 'name' to match the column 'detail_name' from the BGG dataFrame.
ks_database.rename(columns={'name': 'details_name'}, inplace=True)

# Merge the KS and BGG dataFrames together.
boardgame_combined_df = pd.merge(bgg_database, ks_database, on='details_name')

# Export the combined dataFrame into an Excel file.
boardgame_combined_df.to_excel("output.xlsx")
```

<a name="PresentationSlides"></a>
## Further Notes
There are many analyses one can perform given the provided combined DataFrame. Also, more data can be collected from other sources, such as extracting the ratings of board game items sold on Amazon.com using web-scraping techniques. Listed below are some examples of possible board game analyses:
1. Identifying the trend of when each board game was published to analyze the rising popularity and growth of the tabletop gaming genre.
   * Via details_yearpublished column from BoardGameGeek
   * Via launched (or deadline) column from Kickstarter
2. Identify what board game category is most popular.
   * Ex: stats_family_strategygames_bayesaverage for 1-10 rating and stats_family_strategygames_pos for BGG ranking in the strategy game category
3. Identify what type of board game do most people prefer.
   * Via the suggested number of players criteria: ex: polls_suggested_numplayers_3
   * Via average time length of board game to play: details_playingtime
   * Via board game difficulty level which BGG gives 1-5 rankings from easy to hard: stats_averageweight
4. Identify the popularity of new board games from Kickstarter projects.
   * Via the number of backers and US dollars donated to each board game, ex: backers vs usd pledged

