import '../css/main.css';
import { enableStickyNavigation } from './stickyNav';
import { enableMobileMenu } from './menu';
import { activateModal } from './modal';

enableStickyNavigation();
enableMobileMenu();
activateModal();

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 41.143, lng: -8.621 },
        zoom: 12,
        mapTypeControl: false,
        draggable: true,
        scaleControl: false,
        scrollwheel: false,
        navigationControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#263c3f" }],
            },
            {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#6b9a76" }],
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#38414e" }],
            },
            {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#212a37" }],
            },
            {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9ca5b3" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#746855" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#1f2835" }],
            },
            {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#f3d19c" }],
            },
            {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{ color: "#2f3948" }],
            },
            {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }],
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#515c6d" }],
            },
            {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#17263c" }],
            },
        ],
    });

    const service = new google.maps.places.PlacesService(map);

    service.getDetails({
        placeId: 'ChIJa2YYVB5lJA0RvpeQSWyHbVg'
    }, function(place) {
        const marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
        const infowindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + place.formatted_address + '</div>');
            infowindow.open(map, this);
        });
    });

}

function waitForElementById(elementId, callback, intervalMs) {
    const interval = setInterval(function() {
        const element = document.getElementById(elementId);
        if (element) {
            clearInterval(interval);
            callback(element);
        }
    }, intervalMs);
}

function observeCssProperty(element, property, callback) {
    const propToObserve = 'opacity';
    let prevValue = element.style[propToObserve];

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === property) {
                const newValue = element.style[propToObserve];
                if(newValue !== prevValue) {
                    prevValue = newValue;
                    callback(newValue);
                }
            }
        });
    });

    observer.observe(element, { attributes: true });

    return observer;
}

function evbFix() {
    window.addEventListener("load", (event) => {
        waitForElementById('eventbrite-widget-modal-overlay', function() {
            observeCssProperty(document.getElementById('eventbrite-widget-modal-overlay'),
                'style',
                function(value) {
                    if(value === 0) {
                        document.body.removeAttribute('style');
                    }
                });
        });
    });
}

evbFix();


window.initMap = initMap;
