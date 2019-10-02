<template>
<div id="gisbtn" style="width: 99%;height: 100%;border: 1px solid #EAF0F4;position:relative">
    <div id="map" style="margin:0 auto;width: 100%;height: 100%"></div>
    <input type='button' @click="begins()" value='开始' style="position:absolute;right:120px;top:20px;width:50px;z-index:10000"/>
    <input type='button'  @click="deleteline()" value='删除' style="position:absolute;right:60px;top:20px;width:50px;z-index:10000"/>
    <div id="txtlength" style="position:absolute;display:none;background-color:#000;color:white;width:100px;height:20px;z-index:10000"></div>
</div>
</template>
<script>
    export default {
        data() {
            return {
               globalVar:"" ,
               deletelineVar:"",
            //    addLine:"",
               daTa:"",
               offHeight:0,
               newTime:"",  //
               itemId:this.$parent.$parent.$parent.popData.fdProid
            };
        },
        methods: {
            newDatas(){         //获取到当前时间这一天的时间
                var now = new Date();
                var year = now.getFullYear(); //得到年份
                var month = now.getMonth();//得到月份
                var date = now.getDate();//得到日期
                var day = now.getDay();//得到周几
                var hour = now.getHours();//得到小时
                var minu = now.getMinutes();//得到分钟
                var sec = now.getSeconds();//得到秒
                month = month + 1;
                if (month < 10) month = "0" + month;
                if (date < 10) date = "0" + date;
                if (hour < 10) hour = "0" + hour;
                if (minu < 10) minu = "0" + minu;
                if (sec < 10) sec = "0" + sec;
                var time = "";
                this.newTime = year + "-" + month + "-" + date;
            },
            deleteline(){
                this.deletelineVar();
            },
            begins(){
                this.globalVar();
            },
            gisMaps(){
                var _this=this;
                var map, tiandituLayer, marker, markers, lonlat,tianMarkerLayer,province,vLayer,vectorLayer,vectorLine,vectorLine_temp,popup;
                var drawPoint,markerLayer,select,feasel,features,fjjc;
                var markstate = false,start,stop;
                var geojsonParse = new SuperMap.Format.GeoJSON();
                var jsonparse = new SuperMap.Format.JSON();
                var linedis = [],routeresult=[],currentVector=[],drawedVector=[];
                var l = '';
                var zd = new Array();

                    tiandituLayer = new SuperMap.Layer.Tianditu();
                    tiandituLayer.layerType = 'img';
                    tianMarkerLayer = new SuperMap.Layer.Tianditu();
                    tianMarkerLayer.layerType = "img";
                    tianMarkerLayer.isLabel = true;
                    vLayer = new SuperMap.Layer.Vector("vector");
                    vectorLayer = new SuperMap.Layer.Vector("vector1");
                    vectorLine = new SuperMap.Layer.Vector("vectorLine");
                    fjjc = new SuperMap.Layer.Vector("fjjc");
                    vectorLine_temp = new SuperMap.Layer.Vector("vectorLine_temp");
                    drawPoint = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Point);
                    drawPoint.events.on({"featureadded": drawCompleted});
                    markerLayer = new SuperMap.Layer.Markers("Markers");

                    map = new SuperMap.Map("map", {
                        minZoom:3,
                        maxZoom:15,
                        restrictedExtent:new SuperMap.Bounds(-179,-90,179,90),
                        controls: [
                            drawPoint,
                            new SuperMap.Control.Navigation({zoomWheelEnabled:false}),
                            // new SuperMap.Control.Zoom(),
                            new SuperMap.Control.LayerSwitcher(),
                            new SuperMap.Control.PanZoomBar({
                                showSlider:true,
                                forceFixedZoomLevel:[3,12],
                                sliderBarHeight:100,
                            }),

                        ], allOverlays: true
                    });

                    map.addControl(new SuperMap.Control.MousePosition());
                    markers = new SuperMap.Layer.Markers("Markers");
                    map.events.on({"mousemove": getMousePositionPx});
                    map.addLayers([tiandituLayer, markers, tianMarkerLayer,vLayer,vectorLayer,vectorLine_temp,markerLayer,vectorLine,fjjc]);
                    map.setCenter(new SuperMap.LonLat(116, 37), 3);
                    addline();
                    initDrawedLine();

                    select = new SuperMap.Control.SelectFeature(vectorLine, {onSelect: onFeatureSelect, onUnselect: onFeatureUnselect,repeat : true});
                    map.addControl(select);
                    select.activate();

                function begin(){
                    if(linedis.length==0){
                        initMindistance();
                    }
                    markstate = true;
                    start = null;
                    stop = null;
                    routeresult=[];
                    currentVector = [];
                    markerLayer.clearMarkers();
                    vectorLayer.removeAllFeatures();
                    vectorLine_temp.removeAllFeatures();
                    $('#txtlength').hide();
                    drawPoint.activate();
                    select.deactivate();
                }

                _this.globalVar=begin;

                function deleteline(){
                    if(feasel==null){
                        alert("请选择要删除的线路！")
                        return;
                    }
                    if(confirm('删除删除所选线路？')){   //需要提交后台]
                    var params={
                             fdUuid:feasel.data.UserID
                            }
                    _this.$http.post('/engineer/erasureRoute', params)
                    .then(res => {
                        if(res.status==200){
                            _this.$message({
                                message: '线路删除成功',
                                type: 'success'
                            });
                            vectorLine.removeFeatures([feasel]);
                            feasel = null;
                            vectorLine.redraw();
                        }else{
                             _this.$message.error('线路删除失败！');
                        }
                    }).catch(err => {
                         _this.$message.error('线路删除失败！');
                    })
                        vectorLine.removeFeatures([feasel]);
                        // feasel = null;
                        // vectorLine.redraw();
                    }
                }
                _this.deletelineVar=deleteline

                function initDrawedLine(){
                            var params={
                                fdProid:182,    //项目id
                                fdRouteType:2,  //已施工状态为二
                                fdRouteStage:3, //交通工程
                            }
                            _this.$http.post('/engineer/queryRouteByProId', params)
                            .then(res => {
                                    var arr=[];
                                    for(var i=0;i<res.data.data[0].features.length;i++){
                                        arr.push(JSON.parse(res.data.data[0].features[i]));
                                    }
                                    res.data.data[0].features=arr;
                                    drawedVector = geojsonParse.read(res.data.data[0]);
                                    vectorLine.addFeatures(drawedVector);
                                    resetVectorLine(vectorLine);
                                    drawedVector.redraw();
                            }).catch(err => {
                                console.log("数据请求失败")
                            })
                }
                function addline(){
                            var params={
                                fdProid:182,    //项目id
                                fdRouteType:1,  //1未施工道路
                                fdRouteStage:3, //交通工程
                            }
                            _this.$http.post('/engineer/queryRouteByProId', params)
                            .then(res => {
                                var arr=[];
                                    for(var i=0;i<res.data.data[0].features.length;i++){
                                        arr.push(JSON.parse(res.data.data[0].features[i]));
                                    }
                                    res.data.data[0].features=arr;
                                    features = geojsonParse.read(res.data.data[0]);
                                    vLayer.addFeatures(features);
                                    features = vLayer.features;
                                    for(var i=0; i<features.length; i++){
                                        features[i].style={
                                            strokeWidth:3,
                                            strokeColor:'#FFA500'
                                        };
                                        map.zoomToExtent(vLayer.getDataExtent());
                                    }
                                    vLayer.redraw();

                            }).catch(err => {
                                console.log("数据请求失败")
                            })
                }

                function onFeatureSelect(feature){
                    if(feature && feature.attributes && feature.attributes.ddate && feature.attributes.ddate==_this.newTime){//只能选取今日所创建的路段，时间判断需要修改
                        //vectorLine.removeFeatures([feature]);
                        feasel = feature;
                        feature.style={
                            strokeWidth:5,
                            strokeColor:'#FF0000'
                        };
                        vectorLine.redraw();
                    }
                }

                function onFeatureUnselect(feature){
                    feasel = null;
                    feature.style={
                        strokeWidth:5,
                        strokeColor:'#0000FF'
                    };
                    vectorLine.redraw();
                }

                function drawCompleted(drawGeometryArgs) {
                    var point = drawGeometryArgs.feature.geometry,
                        size = new SuperMap.Size(44, 33),
                        offset = new SuperMap.Pixel(-(size.w / 2), -size.h),
                        // icon = new SuperMap.Icon("./marker.png", size, offset);
                        icon = new SuperMap.Icon("static/gis/marker.png", size, offset);
                    if(pointOnLine(point)){
                        vectorLayer.removeFeatures([drawGeometryArgs.feature]);
                        var mk1 = new SuperMap.Marker(new SuperMap.LonLat(point.x, point.y));
                        markerLayer.addMarker(mk1, icon);
                        markerLayer.redraw();
                        if(start!=null && stop!=null){
                            if(confirm("确定提交?")){
                                saveVector();
                                markstate = false;
                                begin();
                                drawPoint.deactivate();
                                select.activate();
                                console.log('act');
                                vectorLayer.removeAllFeatures();
                            }else{
                                markerLayer.removeMarker(mk1);
                                vectorLine_temp.removeAllFeatures();
                                $('#txtlength').html('');
                                $('#txtlength').hide();
                            }
                        }
                    }else{
                        vectorLayer.removeFeatures([drawGeometryArgs.feature]);
                        vectorLayer.redraw();
                        alert('距离过远');
                    }
                }

                function saveVector(){
                    var fea;
                    if(vectorLine_temp.features.length>1){
                        var multilines = [];
                        for(var i=0; i<vectorLine_temp.features.length; i++){
                            var geo = JSON.parse(geojsonParse.write(vectorLine_temp.features[i]));
                            multilines.push(geo.geometry.coordinates);
                        }
                        fea = turf.multiLineString(multilines);
                        fea.properties.ddate=_this.newTime;
                        vectorLine.addFeatures([geojsonParse.read(fea,'Feature')]);
                        fea = jsonparse.write(fea);
                    }else if(vectorLine_temp.features.length==1){
                        vectorLine_temp.features[0].attributes.ddate=_this.newTime;
                        fea = geojsonParse.write(vectorLine_temp.features[0]);
                        vectorLine.addFeatures([geojsonParse.read(JSON.parse(fea),'Feature')]);
                    }

                    vectorLine_temp.removeAllFeatures();
                    resetVectorLine(vectorLine);
                    resetVectorLine(vectorLine_temp);

                    //保存坐标,长度
                    if(fea){
                        var _len = $('#txtlength').html().replace('米','');
                        var uuid=_this.getGuid();
                        var json=JSON.parse(fea);
                        json.properties.UserID=uuid;

                        var params={
                                fdProid:182, //项目Id
                                fdRouteType:2, //路线类型1代表未施工  2代表已施工
                                fdRouteStage:3,
                                fdUuid:uuid,
                                dayTime:_this.newTime,
                                fdM:_len,       //米
                                fdFeatures:JSON.stringify(json) //点信息
                            }
                            _this.$http.post('engineer/insertRoute',params)
                            .then(res => {
                                if(res.status == 200){
                                    _this.$message({
                                        message: '成功添加 '+_len+' 米',
                                        type: 'success'
                                    });
                                }else{
                                    _this.$message.error('后台添加接口异常');
                                }
                                // }else if(res.state == 500 && res.status==null){
                                //     _this.$message({
                                //         message: _this.newTime+'已打点,请勿重复提交',
                                //     });
                                // }
                            }).catch(err => {
                                _this.$message.error('后台添加接口异常');
                            })
                        console.log(_len);        //米数
                        console.log(fea);         //打点坐标
                    }
                }

                function pointOnLine(point){
                    var online = false;
                    var mindistance = null;
                    var index=0;
                    var minline = null;
                    for(var i=0; i<vLayer.features.length; i++){
                        var pt = turf.point([point.x, point.y]);
                        var line = JSON.parse(geojsonParse.write(vLayer.features[i]));
                        var distance = turf.pointToLineDistance(pt, line)*1000;

                        if(mindistance==null){
                            mindistance = distance;
                            index = i;
                            minline = line;
                        }
                        if(distance<=mindistance){
                            mindistance = distance;
                            index = i;
                            minline = line;
                        }
                    }

                    if(mindistance<=20){
                        var near = turf.nearestPointOnLine(minline, pt);
                        if(start==null){
                            start = {p:near,index:index,line:minline};
                        }else{
                            stop = {p:near,index:index,line:minline};
                        }
                        online = true;
                    }else{
                        stop = null;
                        if(start!=null){
                            $('#txtlength').html('距离过远');
                        }
                    }
                    return online;
                }

                function getMousePositionPx(e) {

                    if(!(markstate && start)) return;
                    vectorLine_temp.removeAllFeatures();
                    vectorLine_temp.redraw();

                    lonlat = map.getLonLatFromPixel(new SuperMap.Pixel(e.xy.x, e.xy.y));
                    $('#txtlength').show();
                    $('#txtlength').css({"left":(e.xy.x+20)+"px","top":e.xy.y+"px"});
                    var point = new SuperMap.Geometry.Point(lonlat.lon,lonlat.lat);

                    if(pointOnLine(point)){
                        if(start!=null && stop!=null){
                            if(start.index==stop.index){
                                var sliced = turf.lineSlice(start.p, stop.p, start.line);
                                var length = Math.round(turf.length(sliced.geometry)*1000);
                                vectorLine_temp.addFeatures(geojsonParse.read(sliced));
                                vectorLine_temp.redraw();
                                $('#txtlength').html(length+'米');
                            }else{
                                var intersects = turf.lineIntersect(start.line, stop.line);

                                if(intersects.features.length>0){
                                    var sum=0;
                                    var startline,stopline;
                                    for(var i=0; i<intersects.features.length; i++){
                                        var slicedstart = turf.lineSlice(start.p, intersects.features[i], start.line);
                                        var slicedstop = turf.lineSlice( intersects.features[i],stop.p, stop.line);

                                        var _l = Math.round((turf.length(slicedstart.geometry)+turf.length(slicedstop.geometry))*1000);
                                        if(sum==0){
                                            sum = _l;
                                            startline = slicedstart;
                                            stopline = slicedstop;
                                        }else if(sum>_l){
                                            sum = _l;
                                            startline = slicedstart;
                                            stopline = slicedstop;
                                        }
                                    }
                                    vectorLine_temp.addFeatures(geojsonParse.read(startline));
                                    vectorLine_temp.addFeatures(geojsonParse.read(stopline));
                                    vectorLine_temp.redraw();
                                    $('#txtlength').html(sum+'米');
                                }else{
                                    start.route=null,start.routep=null;
                                    routeresult = [];

                                    routeresult.push([[start.index],[[start.p]]]);
                                    //getRoute([start.index],[[start.p]]);
                                    getRoute2();
                                    if(start.route){
                                        var snum=0;
                                        for(var i=0; i<start.route.length; i++){
                                            var sliced = turf.lineSlice(start.routep[i][0], start.routep[i][1], JSON.parse(geojsonParse.write(vLayer.features[start.route[i]])));
                                            snum += turf.length(sliced);
                                            vectorLine_temp.addFeatures(geojsonParse.read(sliced));
                                            vectorLine_temp.redraw();
                                        }
                                        $('#txtlength').html(Math.round(snum*1000)+'米');
                                    }else{
                                        $('#txtlength').html('请分段提交');
                                    }
                                }
                            }
                            resetVectorLine(vectorLine_temp);
                        }
                    }
                }

                function resetVectorLine(layer){
                    var _features = layer.features;
                    for(var i=0; i<_features.length; i++){
                        _features[i].style={
                            strokeWidth:5,
                            strokeColor:'#0000FF'
                        };
                    }
                    layer.redraw();
                }



                function initMindistance(){
                    for(var i=0; i<vLayer.features.length; i++){
                        var obj={};
                        obj.index=i;
                        obj.diss=[];
                        var f1 = JSON.parse(geojsonParse.write(vLayer.features[i]));
                        var ve = f1.geometry.coordinates;

                        for(var j=0; j<vLayer.features.length; j++){
                            if(i==j) continue;
                            var mindistance=null;
                            var pst=null,p2=null;
                            var f2 = JSON.parse(geojsonParse.write(vLayer.features[j]));
                            for(var k=0; k<ve.length; k++){
                                var pt = turf.point(ve[k]);
                                var distance = turf.pointToLineDistance(pt, f2)*1000;
                                if(mindistance==null || mindistance>distance){
                                    mindistance = distance;
                                    pst = pt;
                                    p2 = turf.nearestPointOnLine(f2, pst);
                                }
                            }
                            obj.diss.push({index:j,mindis:mindistance,p1:pst,p2:p2});
                            //console.log(i+':'+j+'='+mindistance);
                        }
                        linedis.push(obj);
                    }
                }

                function getRoute2(){

                    if(routeresult.length>0){
                        var route = routeresult[0][0];
                        var routep = routeresult[0][1];

                        var current;
                        var re = false;
                        var next = false;
                        for(var j=0; j<linedis.length; j++){
                            if(linedis[j].index==route[route.length-1]){
                                current = linedis[j];
                                break;
                            }
                        }
                        for(var i=0; i<current.diss.length; i++){
                            var _dis = current.diss[i];
                            if((','+route.join(',')+',').indexOf(','+_dis.index+',')<0){

                                if(_dis.mindis<=20){
                                    next = true;
                                    var _route = $.extend(true, [], route);
                                    var _routep = $.extend(true, [], routep);

                                    _route.push(_dis.index);
                                    _routep[_routep.length-1].push(_dis.p1);
                                    _routep.push([_dis.p2]);

                                    routeresult.push([_route,_routep]);

                                    if(_dis.index==stop.index){
                                        _routep[_routep.length-1].push(stop.p);
                                        start.route = _route;
                                        start.routep = _routep;
                                        re = true;
                                        break;
                                    }
                                }
                            }
                        }

                        if(re){
                            return re;
                        }

                        var newrouteresult = [];
                        for(var i=1; i<routeresult.length; i++){
                            newrouteresult.push(routeresult[i]);
                        }
                        routeresult = newrouteresult;
                        getRoute2();
                    }
                }
            },
         getGuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        }
        },
        mounted: function () {
            this.gisMaps()
            this.newDatas()
        },
    }
</script>

<style scoped>

</style>
