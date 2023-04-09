// Set the configuration for your app
var firebase;
var delay = 100;
var geocoder;
var tempList = [];
var addressList = [];
function initFireBase() {
    var config = {
        apiKey: "AIzaSyC4NNaeN0JLpiSDGEQniy5m0mqoflB9l5w",
        authDomain: "swmrt-1d72c.firebaseapp.com",
        projectId: 'swmrt-1d72c',
        databaseURL: "https://swmrt-1d72c.firebaseio.com",
        storageBucket: "swmrt-1d72c.appspot.com"
    };
    var defaultProject = firebase.initializeApp(config);
    // Get a reference to the database service
    firebase = defaultProject.database();
    if (isMapPage == true) {
        setMarketByAddress();
    }
    var data = firebase.ref('addresslist');
    data.on('child_added', function (address) {
        var obj = { id: address.key, street: address.val().street, pincode: address.val().pincode, area: address.val().area, houseno: address.val().houseno, apartment: address.val().apartment, email: address.val().email, name: address.val().name, country: address.val().country, city: address.val().city, lat: address.val().lat, lang: address.val().lang }
        addressList.push(obj)
        if (isMapPage == false)
            bindAddress();
    });
    data.on('child_removed', function (address) {
        addressList.forEach((elemnt, index
        ) => {
            if (elemnt.lat == address.val().lat && elemnt.lang == address.val().lang) {
                addressList.splice(index, 1)
                if (isMapPage == false)
                    bindAddress();
            }
        })
    });
    data.on('child_changed', function (address) {
        data.once('value', function (list) {
            addressList = [];
            list.forEach(function (address) {
                var obj = { id: address.key, street: address.val().street, pincode: address.val().pincode, area: address.val().area, houseno: address.val().houseno, apartment: address.val().apartment, email: address.val().email, name: address.val().name, country: address.val().country, city: address.val().city }
                addressList.push(obj)
            });
            if (isMapPage == false) {
                bindAddress();
            }
        });
    });
}
function initGeoCoder() {
    geocoder = new google.maps.Geocoder();

}
function getAddress() {


}
function bindAddress() {
    var rows = '';
    addressList.forEach((elemnt, index) => {
        rows = rows + `<tr>
        <td>${elemnt.name}</td>
        <td>${elemnt.email}</td>
        <td>${elemnt.houseno}</td>
        <td>${elemnt.apartment}</td>
        <td>${elemnt.street}</td>
        <td>${elemnt.area}</td>
        <td>${elemnt.city}</td>
        <td>${elemnt.pincode}</td>
        <td> <button style="padding:0px;width:100%" onclick="removeAddress('${elemnt.id}')" type="button">Remove</button></td>
        </tr>`
    })
    document.getElementById('addressList').innerHTML = rows;
}
function getZoom() {
    var data = firebase.ref('zoom');
    data.on('value', function (zoom) {
        var zoom = zoom.val();
        setZoom(parseInt(zoom));
    });
}
function removeAddress(index) {
    if (confirm('Are you sure want delete?')) {
        firebase.ref('addresslist/' + index).remove();
    }
}
function addMarker(event) {
    var isValid = true;
    event.preventDefault();
    if (isValid) {
        var element = {
            Street: document.getElementsByName("street")[0].value,
            Pincode: document.getElementsByName("pincode")[0].value,
            Area: document.getElementsByName("area")[0].value,
            HouseNo: document.getElementsByName("house")[0].value,
            Apartment: document.getElementsByName("apartment")[0].value,
            Email: document.getElementsByName("email")[0].value,
            Name: document.getElementsByName("name")[0].value,
            country: document.getElementsByName("country")[0].value,
            city: document.getElementsByName("city")[0].value,
            DoYouCompost: "",
            DoYouCompostAns: "",
            ApartmentCommunityLaneHouseHoldUnit: "",
            IfAtHomeAns: "",
            HowLongComposting: "",
            WhatComposterDoYouUse: "",
            DoYouDoWithYourCompost: "",
            DoYouHaveExcessCompost: "",
            WillingSignupSwachagraha: "",
            DoyouExclusivelyCompostLeavesFlowers: "",
            LeaveFlowerComposterType: "",
            StayConnectedWhatsapp: "",
            ContactNo: "",
            WardNumber: "",
            WardName: "",
            ConstituencyName: "",
            ConstituencyNumber: "",
        }
        getGoogleLat(element)
    }
}
function addFireBase(elemnt) {
    var key = {
        id: 'addresslist/address' + new Date().valueOf(),
        street: elemnt.Street == undefined ? "" : elemnt.Street,
        pincode: elemnt.Pincode == undefined ? "" : elemnt.Pincode,
        area: elemnt.Area == undefined ? "" : elemnt.Area,
        houseno: elemnt.HouseNo == undefined ? "" : elemnt.HouseNo,
        apartment: elemnt.Apartment == undefined ? "" : elemnt.Apartment,
        email: elemnt.Email == undefined ? "" : elemnt.Email,
        name: elemnt.Name == undefined ? "" : elemnt.Name,
        country: elemnt.country == undefined ? 'IN' : elemnt.country,
        city: elemnt.city == undefined ? 'Bengaluru' : elemnt.city,
        lat: elemnt.lat,
        lang: elemnt.lang,
        doyoucompost: elemnt.DoYouCompost == undefined ? '' : elemnt.DoYouCompost,
        doyoucompostAns: elemnt.DoYouCompostAns == undefined ? '' : elemnt.DoYouCompostAns,
        apartmentcommunitylanehouseholdunit: elemnt.ApartmentCommunityLaneHouseHoldUnit == undefined ? '' : elemnt.ApartmentCommunityLaneHouseHoldUnit,
        ifathomeans: elemnt.IfAtHomeAns == undefined ? '' : elemnt.IfAtHomeAns,
        howlongcomposting: elemnt.HowLongComposting == undefined ? '' : elemnt.HowLongComposting,
        whatcomposterdoyouuse: elemnt.WhatComposterDoYouUse == undefined ? '' : elemnt.WhatComposterDoYouUse,
        doyoudowithyourcompost: elemnt.DoYouDoWithYourCompost == undefined ? '' : elemnt.DoYouDoWithYourCompost,
        doyouhaveexcesscompost: elemnt.DoYouHaveExcessCompost == undefined ? '' : elemnt.DoYouHaveExcessCompost,
        willingsignupswachagraha: elemnt.WillingSignupSwachagraha == undefined ? '' : elemnt.WillingSignupSwachagraha,
        doyouexclusivelycompostleavesflowers: elemnt.DoyouExclusivelyCompostLeavesFlowers == undefined ? '' : elemnt.DoyouExclusivelyCompostLeavesFlowers,
        leavesflowerscompostertype: elemnt.LeaveFlowerComposterType == undefined ? '' : elemnt.LeaveFlowerComposterType,
        stayconnectedwhatsapp: elemnt.StayConnectedWhatsapp == undefined ? '' : elemnt.StayConnectedWhatsapp,
        contactno: elemnt.ContactNo == undefined ? '' : elemnt.ContactNo,
        wardnumber: elemnt.WardNumber == undefined ? '' : elemnt.WardNumber,
        wardname: elemnt.WardName == undefined ? '' : elemnt.WardName,
        constituencyname: elemnt.ConstituencyName == undefined ? '' : elemnt.ConstituencyName,
        constituencynumber: elemnt.ConstituencyNumber == undefined ? '' : elemnt.ConstituencyNumber,
        formatted_address: elemnt.formatted_address,
        timestamp: elemnt.Timestamp
    }
    firebase.ref(key.id).set(key, function (error) {
        if (error) {
            console.log(error)
        } else {
            document.getElementById("myForm").reset();
        }
    });
}
function bulkUpload(data) {
    data.forEach(element => {
        if (addressList.findIndex(x => x.email == element.Email) == -1) {
            tempList.push(element);
        }
    })
    getGoogleLatTimer();

}
function sliderChange() {
    var zoom = document.getElementById('slider').value;
    firebase.ref().update({
        zoom: zoom
    }, function (error) {
        if (error) {
            alert(error)
        } else {

        }
    });


}

function getGoogleLat(element, next) {
    address = element.HouseNo + ' ' + element.Street;
    if (element.HouseNo == '' && element.Street == '') {
        address = element.Apartment;
    }
    geocoder.geocode({ address: address, componentRestrictions: { country: element.country == undefined ? 'IN' : element.country, postalCode: element.Pincode, locality: element.Area } }, function (results, status) {
        if (status === 'OK') {
            var lat = results[0].geometry.location.lat()
            var lang = results[0].geometry.location.lng()
            element.lat = lat;
            element.lang = lang;
            element.formatted_address = results[0].formatted_address
            addFireBase(element)
            console.log('found');
        }// === if we were sending the requests to fast, try this one again and increase the delay

        else {
            if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                nextAddress--;
                delay++;
                if (delay > 4000) {
                    delay = 200;
                }
            }
            else {
                element.lat = '';
                element.lang = '';
                element.formatted_address = '';
                addFireBase(element)
                var reason = "Code " + status;
                var msg = `Name=${element.Name} Address=${address} Pincode =${element.Pincode} error=${reason}`;
                console.log(msg)
            }
        }
        if (next != undefined)
            next();
    });

}

var nextAddress = 0;

function getGoogleLatTimer() {
    if (nextAddress < tempList.length) {
        setTimeout(getGoogleLat(tempList[nextAddress], getGoogleLatTimer), delay);
        nextAddress++;
    }
    else {
        tempList = [];
    }

}

initFireBase();