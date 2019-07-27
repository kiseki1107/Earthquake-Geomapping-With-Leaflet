![USGS Logo Cover](https://raw.githubusercontent.com/kiseki1107/leaflet_geomapping/master/Images/USGS_logo.png)

# USGS Earthquake Geomapping and Leaflet Data Visualization
This geomap application captures earthquake occurences and patterns around the world with data provided by the United States Geological Survey ([USGS](https://www.usgs.gov/)).

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
The following image is a result of the earthquake data obtain from USGS geoJSON files within the past week. Each circle represents the latitude and longitude of an earthquake occurrence with the varying sizes and color ranges being proportionally based on the magnitude intensity. The bigger the circle, the stronger the earthquake. The colors utilize the traffic light color scheme which depicts increasing earthquake intensity from green to red. There is a color legend included in the map visualization for earthquake magnitude reference. Each circle dataset can be clicked to bring a popup display of additional information about the earthquake event (ex: location, magnitude level, and time and date of event) 

Additonally, tectonic plates (orange lines) are displayed on the map visualization as a secondary map overlay to illustrate the relationship between tectonic plates and seismic activity. The tectonic plates data is another geoJSON file which can be obtained [here](https://github.com/fraxen/tectonicplates/blob/master/GeoJSON/PB2002_boundaries.json).

![Project Final Earthquake Image Sample](https://raw.githubusercontent.com/kiseki1107/leaflet_geomapping/master/earthquake_geomap.png)

The base map, provided by [Mapbox](https://www.mapbox.com/), can be viewed via satellite view, street view, or outdoors view based on user preference. In order to have retrieve the base maps, an API key is required for Mapbox to be accessible.

[Leaflet](https://leafletjs.com/) was used in order to create the geomapping of the earthquake and tectonic plate data onto the base map as overlays.

<a name="Notes"></a>
## Further Notes
The following follows are included in this repository:
* [logic.js](https://github.com/kiseki1107/leaflet_geomapping/blob/master/logic.js) file contains the primary code for the map creation.
* [style.css](https://github.com/kiseki1107/leaflet_geomapping/blob/master/style.css) file contains the codes for designing and styling the map visualization.
* [index.html](https://github.com/kiseki1107/leaflet_geomapping/blob/master/index.html) file will display the map.
