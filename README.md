Creating a geomap visualization of earthquake and tetonic plates data provided by the United States Geological Survey (USGS) via https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php.
<hr>
Languages used: JavaScript, HTML5, CSS

![USGS Logo Cover](https://raw.githubusercontent.com/kiseki1107/leaflet_geomapping/master/Images/USGS_logo.png)

# USGS Earthquake Geomapping and Leaflet Data Visualization
This application captures earthquake occurences and patterns around the world with data provided by the United States Geological Survey ([USGS](https://www.usgs.gov/)).

## Table of Contents
* [Introduction](#Introduction)
  * [Methods](#Methods)
  * [Technologies](#Technologies)
  * [Dependencies](#Dependencies)
* [Data Visualization](#DataVisualization)
* [Further Notes](#Notes)

<a name="Introduction"></a>
## Introduction
The United States Geological Survey (USGS) provides public scientific data sources that focus on the issues of climate impact, natual hazards, and environment and ecological resources in the United States. Their discipline ranges from topics in biology, geography, geology, and hydrology. The USGS collects data on earthquakes periodically and releases the information publically which can be obtained [here](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php). The earthquake data can be grabbed from the past hour, the past day, the past week, or even the past month which will return an url that provides the data in a JSON format. This project utilizes the earthquake data from the past 7 days which gets updated periodically.

![USGS Earthquake JSON data source](https://raw.githubusercontent.com/kiseki1107/leaflet_geomapping/master/Images/USGS_data_sample.png)

<a name="Methods"></a>
### Methods
* Data Visualization

<a name="Technologies"></a>
### Technologies
* JavaScript
* HTML5
* CSS

<a name="Dependencies"></a>
### Dependencies 
* [GeoJSON](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
* [Leaflet](https://leafletjs.com/)
* [Mapbox](https://www.mapbox.com/)
* [D3](https://d3js.org/)

<a name="DataVisualization"></a>
## Data Visualization
[Click here](https://github.com/kiseki1107/ETL/blob/master/ETL.ipynb) for code reference.

![Project Final Earthquake Image Sample](https://raw.githubusercontent.com/kiseki1107/leaflet_geomapping/master/earthquake_geomap.png)

<a name="Notes"></a>
## Further Notes
