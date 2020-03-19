<template>
    <div>
    <router-link to="/mapa" class="nav-link">Mapa</router-link>
    <table class="table table-hover">
            <tr>
                <th @click="sort('OBJECTID')">OBJECTID</th>
                <th @click="sort('Country_Region')">Kraj</th>
                <th @click="sort('Province_State')">Prowincja</th>
                <th @click="sort('Lat')">Latitude</th>
                <th @click="sort('Long_')">Longitude</th>
                <th @click="sort('Confirmed')">Confirmed</th>
                <th @click="sort('Recovered')">Recovered</th>
                <th @click="sort('Deaths')">Deaths</th>
                <th @click="sort('Active')">Active</th>
                <th @click="sort('Update')">Update</th>
            </tr>
            <tr v-for="corona in coronas" :id="['Row_' + corona.attributes.OBJECTID]">
                <td>{{corona.attributes.OBJECTID}}</td>
                <td>{{corona.attributes.Country_Region}}</td>
                <td>{{corona.attributes.Province_State}}</td>
                <td>{{corona.attributes.Lat}}</td>
                <td>{{corona.attributes.Long_}}</td>
                <td>{{corona.attributes.Confirmed}}</td>
                <td>{{corona.attributes.Recovered}}</td>
                <td>{{corona.attributes.Deaths}}</td>
                <td>{{corona.attributes.Active}}</td>
                <td>{{corona.attributes.Last_Update}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                coronas: [],
                currentSort:'OBJECTID',
                currentSortDir:'asc'
            }
        },
        methods: {
            fetchCorona() {
                this.$http.get('https://services9.arcgis.com/N9p5hsImWXAccRNI/arcgis/rest/services/Z7biAeD8PAkqgmWhxG2A/FeatureServer/1/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc%2CCountry_Region%20asc%2CProvince_State%20asc&outSR=102100&resultOffset=0&resultRecordCount=250&cacheHint=true')
                    .then(response => response.json())
                    .then(result => this.coronas = result.features)
            },
            sort: function(s) {
                //if s == current sort, reverse
                console.log('sort: '+s);
                if(s === this.currentSort) {
                    this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
                }
                this.currentSort = s;
            }
        },
        created: function () {
            this.fetchCorona();
        },
        computed:{
            sortedCoronas: function() {
                return this.coronas.sort((a,b) => {
                    let modifier = 1;
                    if(this.currentSortDir === 'desc') modifier = -1;
                    if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                    if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                    return 0;
                });
            }
        }
    }
</script>

<style scoped>
</style>
