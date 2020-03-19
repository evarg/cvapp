<template>
    <div>
        <router-link to="/corona" class="nav-link">Lista</router-link>
        <div id='map' style='width: 1000px; height: 600px;' ref="mapElement"></div>
    </div>
</template>

<script>
    import mapboxgl from 'mapbox-gl';

    export default {
        data () {
            return {
                coronas: []
            }
        },
        mounted() {
            this.createMap();
            this.fetchCorona();
        },
        created: function () {
        },
        methods: {
            createMap: function() {
                mapboxgl.accessToken = 'pk.eyJ1IjoiZXZhcmciLCJhIjoiY2s3eDJucXNhMDdkaDNmcjRtMHJpNnJodyJ9.92Ma7WxvPO4-mDep0QmSCA';

                this.map = new mapboxgl.Map({
                    container: 'map',
                    style: 'mapbox://styles/mapbox/streets-v11',
                    zoom: 1.5,
                })
            },
            fetchCorona() {
                this.$http.get('https://services9.arcgis.com/N9p5hsImWXAccRNI/arcgis/rest/services/Z7biAeD8PAkqgmWhxG2A/FeatureServer/1/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc%2CCountry_Region%20asc%2CProvince_State%20asc&outSR=102100&resultOffset=0&resultRecordCount=250&cacheHint=true')
                    .then(response => response.json())
                    .then(result => this.coronas = result.features)
                    .then(this.addMarkers)
            },
            addMarkers: function () {
                for (var i = 0; i < this.coronas.length; i++) {
                    console.log(this.coronas[i].attributes.Long_);
                    
                    var a = new Date(this.coronas[i].attributes.Last_Update);
                    var months = ['Sty','Lut','Mar','Kwi','Maj','Cze','Lip','Sie','Wrz','Paz','Lis','Gru'];
                    var time = a.getDate() + ' ' + months[a.getMonth()] + ' ' + a.getFullYear() + ' ' + a.getHours() + ':' + a.getSeconds();
                    
                    new mapboxgl.Marker({})
                            .setLngLat([this.coronas[i].attributes.Long_, this.coronas[i].attributes.Lat])
                            .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                                .setHTML(
                                    '<h3>' + this.coronas[i].attributes.Country_Region + '</h3>' +
                                    '<p><b>Data aktualizacji: ' + time + '</b></p>' +
                                    '<p>Potwierdzone przypadki: ' + this.coronas[i].attributes.Confirmed + '</p>' +
                                    '<p>Zgony: ' + this.coronas[i].attributes.Deaths + '</p>' +
                                    '<p>Wyleczeni: ' + this.coronas[i].attributes.Recovered + '</p>' +
                                    '<p>Aktywni: ' + this.coronas[i].attributes.Active + '</p>'
                            ))
                            .addTo(this.map);
                }
            }    
        }
    }

</script>

<style scoped>
    @import 'https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.css'
</style>
