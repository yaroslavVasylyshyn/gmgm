// ==UserScript==
// @name         Google Maps Helper
// @namespace    http://tampermonkey.net/
// @version      1.43
// @description  Add buttons to Google Maps to copy place information and search with a template
// @author       Lehkyi Maksym
// @match        https://*.google.com/maps/*
// @match        https://*.google.com.ua/maps/*
// @match        https://*.google.pl/maps/*
// @match        https://*.yelp.com/*
// @match        https://*.yelp.ca/*
// @match        https://*.facebook.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function copyName(copy = true) {
        let placeName = document.querySelector('h1.DUwDvf.lfPIob');
        if (!placeName) throw new Error('Place information not found');

        let info = placeName.cloneNode(true);
        let buttons = info.querySelectorAll('button');
        buttons.forEach(button => button.remove());

        let text = info.innerText.trim()
            .replaceAll('`', '\'')
            .replaceAll('’', '\'')
            .replaceAll('ʻ', '\'')
            .replaceAll('´', '\'')
            .replace(/–––Copy Info–––|–––Google Search–––|–––Open Editors–––/g, '')
            .trim();
        text = transformPlaceName(text);
        if (copy) {
            navigator.clipboard.writeText(text);
            showSnackBar();
        }
        return text;
    }

    function transformPlaceName(name) {
        const replacements = {
            'ä': 'a', 'ö': 'o', 'ü': 'u', 'ß': 'ss',
            'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
            'à': 'a', 'è': 'e', 'ì': 'i', 'ò': 'o', 'ù': 'u',
            'â': 'a', 'ê': 'e', 'î': 'i', 'ô': 'o', 'û': 'u',
            'ã': 'a', 'õ': 'o', 'ñ': 'n', 'ç': 'c'
        };
        name = name.replace(/[äöüßáéíóúàèìòùâêîôûãõñç]/g, char => replacements[char] || char);
        return name;
    }

    function copyAddress(copy = true) {
        let addressElement = document.querySelector('div.Io6YTe.fontBodyMedium.kR99db');
        try {
            if (addressElement) {
                if (!addressElement.innerText.includes('Confirm or fix this location')) {
                    let info = `${addressElement.innerText}`;
                    if (copy) {
                        navigator.clipboard.writeText(info);
                        showSnackBar();
                    }
                    return info;
                } else {
                    addressElement = document.querySelector('span.DkEaL');
                    if (addressElement) {
                        let info = `${addressElement.innerText}`;
                        if (copy) {
                            navigator.clipboard.writeText(info);
                            showSnackBar();
                        }
                        return info;
                    }
                }
            } else {
                addressElement = document.querySelector('div.Y4SsEe');
                if (addressElement && addressElement.ariaLabel.includes('Confirm or fix this location')) addressElement = document.querySelector('span.DkEaL');
                if (addressElement) {
                    let info = `${addressElement.ariaLabel.replace('Address, ','')}`;
                    if (copy) {
                        navigator.clipboard.writeText(info);
                        showSnackBar();
                    }
                    return info;
                } else {
                    throw new Error('Address element not found');
                    return "";
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    function copyBuildingAt(copy = true) {
        let addressElement = copyAddress(false);
        if (addressElement) {
            let addressText = addressElement.replace(', USA', '').replace(', United States', '');
            let splitted = addressText.split(', ')[0];
            let info = "Building at " + deleteSuite(splitted);
            if (copy) {
                navigator.clipboard.writeText(info);
                showSnackBar();
            }
            return info;
        } else {
            throw new Error('Address element not found');
            if (copy) alert('Address element not found.');
            return "Building at \"address\"";
        }
    }

    function copyOfficeAt(copy = true) {
        let addressElement = copyAddress(false);
        if (addressElement) {
            let addressText = addressElement.replace(', USA', '').replace(', United States', '');
            let splitted = addressText.split(', ')[0];
            let info = "Office at " + deleteSuite(splitted);
            if (copy) {
                navigator.clipboard.writeText(info);
                showSnackBar();
            }
            return info;
        } else {
            throw new Error('Address element not found');
            if (copy) alert('Address element not found.');
            return "Building at \"address\"";
        }
    }

    function copyIndustrialAt(copy = true) {
        let addressElement = copyAddress(false);
        if (addressElement) {
            let addressText = addressElement.replace(', USA', '').replace(', United States', '');
            let splitted = addressText.split(', ')[0];
            let info = "Industrial Estate at " + deleteSuite(splitted);
            if (copy) {
                navigator.clipboard.writeText(info);
                showSnackBar();
            }
            return info;
        } else {
            throw new Error('Address element not found');
            if (copy) alert('Address element not found.');
            return "Building at \"address\"";
        }
    }

    function copyWarehouseAt(copy = true) {
        let addressElement = copyAddress(false);
        if (addressElement) {
            let addressText = addressElement.replace(', USA', '').replace(', United States', '');
            let splitted = addressText.split(', ')[0];
            let info = "Warehouse at " + deleteSuite(splitted);
            if (copy) {
                navigator.clipboard.writeText(info);
                showSnackBar();
            }
            return info;
        } else {
            throw new Error('Address element not found');
            if (copy) alert('Address element not found.');
            return "Building at \"address\"";
        }
    }

    function copyDistributionCenterAt(copy = true) {
        let addressElement = copyAddress(false);
        if (addressElement) {
            let addressText = addressElement.replace(', USA', '').replace(', United States', '');
            let splitted = addressText.split(', ')[0];
            let info = "Distribution Center at " + deleteSuite(splitted);
            if (copy) {
                navigator.clipboard.writeText(info);
                showSnackBar();
            }
            return info;
        } else {
            throw new Error('Address element not found');
            if (copy) alert('Address element not found.');
            return "Building at \"address\"";
        }
    }

    function copyFactoryAt(copy = true) {
        let addressElement = copyAddress(false);
        if (addressElement) {
            let addressText = addressElement.replace(', USA', '').replace(', United States', '');
            let splitted = addressText.split(', ')[0];
            let info = "Factory at " + deleteSuite(splitted);
            if (copy) {
                navigator.clipboard.writeText(info);
                showSnackBar();
            }
            return info;
        } else {
            throw new Error('Address element not found');
            if (copy) alert('Address element not found.');
            return "Building at \"address\"";
        }
    }

    function copyResidentialBuildingAt(copy = true) {
        let addressElement = copyAddress(false);
        if (addressElement) {
            let addressText = addressElement.replace(', USA', '').replace(', United States', '');
            let splitted = addressText.split(', ')[0];
            let info = "Residential Building at " + deleteSuite(splitted);
            if (copy) {
                navigator.clipboard.writeText(info);
                showSnackBar();
            }
            return info;
        } else {
            throw new Error('Address element not found');
            if (copy) alert('Address element not found.');
            return "Building at \"address\"";
        }
    }

    async function searchLeasing() {
        let addressElement = copyAddress(false);
        if (addressElement) {
            let addressText = addressElement.replace(', USA', '');
            let cleanAddress = addressText.replace(', United States', '');
            let searchQuery = `leasing ${cleanAddress}`;
            let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
            await delay(300);
            window.open(searchUrl, '_blank');
        } else {
            throw new Error('Address element not found');
            alert('Address element not found.');
        }
    }

    async function searchGrandOpening() {
        let addressElement = copyAddress(false);
        if (addressElement) {
            let addressText = addressElement.replace(', USA', '');
            let cleanAddress = addressText.replace(', United States', '');
            let searchQuery = `${copyName(false)} ${cleanAddress} grand opening`;
            let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
            await delay(300);
            window.open(searchUrl, '_blank');
        } else {
            throw new Error('Address element not found');
            alert('Address element not found.');
        }
    }

    function formatHours(hoursText) {
        if (!hoursText || hoursText.trim() === "") return "";
        let hoursLines = hoursText.trim().split('\n');
        let days = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];
        let sortedHoursByDay = {};
        hoursLines.forEach(line => {
            let [day, hours] = line.split(': ');
            let shortDay = day.toLowerCase().substr(0, 2);
            if (hours !== 'Closed') sortedHoursByDay[shortDay] = hours;
        });
        let hoursByDay = {};
        days.forEach(day => {
            if (sortedHoursByDay.hasOwnProperty(day)) hoursByDay[day] = sortedHoursByDay[day];
        });
        let tempSame = true;
        days.forEach(day => {
            if (hoursByDay[day] !== "Open 24 hours") tempSame = false;
            else if (hoursByDay[day] === "Open 24 hours") hoursByDay[day] = "00:00 to 12:00 AM";
        });
        if (tempSame) return "mo-su 00:00-24:00";
        let hoursIn24Format = {};
        for (let day in hoursByDay) {
            if (hoursByDay[day].includes(',')) {
                let hourse = hoursByDay[day].replaceAll(', ',',').split(',');
                hoursIn24Format[day] = '';
                for (let k = 0; k < hourse.length; k++) {
                    hoursIn24Format[day] += convertTo24Hour(hourse[k].replace(' to ', '-').replace(' - ','-'));
                    if (k < hourse.length - 1) hoursIn24Format[day] += ',';
                }
            } else {
                hoursIn24Format[day] = convertTo24Hour(hoursByDay[day].replace(' to ', '-').replace(' - ','-'));
            }
        }
        for (let day in hoursByDay) hoursByDay[day] = hoursIn24Format[day];
        let uniqueHours = [...new Set(Object.values(hoursByDay))];
        let result = "";
        for (let i = 0; i < uniqueHours.length; i++) {
            let sameHours = [];
            for (let j = 0; j < 7; j++) {
                if (hoursIn24Format[days[j]] === uniqueHours[i]) sameHours.push(days[j]);
            }
            let groupedDays = [];
            let startDay = sameHours[0];
            let endDay = sameHours[0];
            for (let k = 1; k < sameHours.length; k++) {
                if (days.indexOf(sameHours[k]) === days.indexOf(endDay) + 1) {
                    endDay = sameHours[k];
                } else {
                    groupedDays.push(startDay === endDay ? startDay : `${startDay}-${endDay}`);
                    startDay = sameHours[k];
                    endDay = sameHours[k];
                }
            }
            groupedDays.push(startDay === endDay ? startDay : `${startDay}-${endDay}`);
            result += `${groupedDays.join(",")} ${uniqueHours[i]}`;
            if (i < uniqueHours.length - 1) result += "; ";
        }
        return result;
    }

function convertTo24Hour(time12h, first = false) {
    // Handle time ranges (e.g., "10 am–8 pm")
    if (time12h.includes('–') || time12h.includes('-')) {
        time12h = time12h.replace('–', '-');
        const [startTime, endTime] = time12h.split('-');
        // Convert both parts of the range separately
        const start24 = convertTo24Hour(startTime.trim(), true);
        const end24 = convertTo24Hour(endTime.trim());
        return `${start24}-${end24}`;
    }
    // Handle single time (e.g., "10 am" or "8 pm")
    let [time, modifier] = time12h.split(' ');
    if (!modifier) {
        // Try splitting by space if ' ' didn't work
        [time, modifier] = time12h.split(' ');
    }
    let [hours, minutes] = time.includes(':') ?
        time.split(':') :
        [time, '00'];
    hours = hours.padStart(2, '0');
    minutes = minutes || '00';
    // Convert to 24-hour format
    if (modifier) {
        modifier = modifier.toUpperCase();
        if (modifier === 'PM' && hours !== '12') {
            hours = String(parseInt(hours, 10) + 12);
        } else if (modifier === 'AM' && hours === '12') {
            hours = '00';
        }
    }
    return `${hours}:${minutes}`;
}

    function copyOH(copy = true, dayContainer = document.querySelector('.eK4R0e')) {
        if (dayContainer) {
            let dayElements = dayContainer.querySelectorAll('tr.y0skZc');
            if (dayElements) {
                let hoursInfo = [];
                dayElements.forEach(day => {
                    let dayName = day.querySelector('td.ylH6lf div').innerText;
                    let hours = day.querySelector('td.mxowUb').ariaLabel
                        .split(',')
                        .filter(part => !part.includes('Hours might differ') && !part.includes('Holiday hours'))
                        .join(',');
                    hoursInfo.push(`${dayName}: ${hours}`);
                });
                let hoursText = hoursInfo.join('\n');
                let formatted = formatHours(hoursText);
                if (formatted === "") {
                    console.log('Opening hours elements not found');
                    return;
                }
                if (copy) {
                    navigator.clipboard.writeText(formatted);
                    showSnackBar();
                }
                try {
                    if (copy && document.querySelector('.rYsDIf').innerText === "Holiday hours") {
                        alert('Careful, you have holiday hours, recheck by "suggest new hours"\n' + formatted);
                    }
                } catch (error) {}
                return formatted;
            } else {
                throw new Error('Opening hours elements not found');
                return "Expand hours to see time (maybe there is no time)";
            }
        } else {
            let category = document.querySelector('.skqShb .fontBodyMedium');
            if (category && category.nextElementSibling) {
                let next = category.nextElementSibling;
                let text = next.innerText;
                let mosu24 = 'mo-su 00:00-24:00';
                if (text === 'Building' || text === 'Park' || text === 'Shopping mall') {
                    if (copy) {
                        navigator.clipboard.writeText(mosu24);
                        showSnackBar();
                    }
                    return mosu24;
                }
            }
            throw new Error('Day container not found');
            return "Expand hours to see time (maybe there is no time)";
        }
    }

    function copyYelpOH(copy = true) {
        let dayContainer = document.querySelector('.hours-table__09f24__KR8wh');
        if (dayContainer) {
            let dayElements = dayContainer.querySelectorAll('tr.y-css-29kerx');
            if (dayElements.length > 0) {
                let hoursInfo = [];
                dayElements.forEach(day => {
                    let dayNameElement = day.querySelector('th p.day-of-the-week__09f24__JJea_');
                    let hoursElements = day.querySelectorAll('td.y-css-1hgawz4 ul li p.no-wrap__09f24__c3plq');
                    if (dayNameElement && hoursElements.length > 0) {
                        let dayName = dayNameElement.innerText;
                        let hoursArray = [];
                        hoursElements.forEach(hourElement => {
                            let hours = hourElement.innerText;
                            if (hours.includes('-')) hours = hours.replace('-', 'to');
                            if (hours.includes(' (Next day)')) hours = hours.replace(' (Next day)', '');
                            hoursArray.push(hours);
                        });
                        let hours = hoursArray.join(',');
                        hoursInfo.push(`${dayName}: ${hours}`);
                    }
                });
                let hoursText = hoursInfo.join('\n');
                let formatted = formatHours(hoursText);
                if (formatted === "" || !formatted) throw new Error('Opening hours elements not found');
                if (copy) {
                    navigator.clipboard.writeText(formatted);
                    showSnackBar();
                }
                return formatted;
            } else {
                throw new Error('Opening hours elements not found');
                return "(maybe there is no time)";
            }
        } else {
            throw new Error('Day container not found');
            return "(maybe there is no time)";
        }
    }

    function copyYelpUpdateOH(copy = true) {
        let dayContainer = document.querySelector('.day-hours');
        if (dayContainer) {
            let dayElements = dayContainer.querySelectorAll('.hours');
            if (dayElements.length > 0) {
                let hoursInfo = {};
                dayElements.forEach(day => {
                    let dayNameElement = day.querySelector('.weekday');
                    let startElement = day.querySelector('.start');
                    let endElement = day.querySelector('.end');
                    if (dayNameElement && startElement && endElement) {
                        let dayName = dayNameElement.innerText;
                        let hours = `${startElement.innerText} to ${endElement.innerText}`;
                        hours = hours.replaceAll('am', 'AM').replaceAll('pm', 'PM');
                        if (hoursInfo[dayName]) hoursInfo[dayName].push(hours);
                        else hoursInfo[dayName] = [hours];
                    }
                });
                let hoursFormatted = [];
                for (let day in hoursInfo) {
                    let hoursForDay = hoursInfo[day].join(',');
                    hoursFormatted.push(`${day}: ${hoursForDay}`);
                }
                let hoursText = hoursFormatted.join('\n');
                let formatted = formatHours(hoursText);
                if (formatted === "" || !formatted) throw new Error('Opening hours elements not found');
                if (copy) {
                    navigator.clipboard.writeText(formatted);
                    showSnackBar();
                }
                return formatted;
            } else {
                throw new Error('Opening hours elements not found');
                return "(maybe there is no time)";
            }
        } else {
            throw new Error('Day container not found');
            return "(maybe there is no time)";
        }
    }

    function replacinDay(day = 'null') {
        let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        let daysR = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
        let daysU = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П’ятниця', 'Субота', 'Неділя'];
        let index = daysR.findIndex(d => d === day);
        if (index !== -1) return days[index];
        index = daysU.findIndex(d => d === day);
        if (index !== -1) return days[index];
        return day;
    }

    function copyFBHours(copy = true) {
        let dayContainer = document.querySelectorAll('.xyorhqc .x9f619 .x193iq5w');
        let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        if (dayContainer.length > 0) {
            let hoursInfo = [];
            dayContainer.forEach(dayDiv => {
                let dayNameElement = dayDiv.querySelector('span[dir="auto"]');
                if (dayNameElement && !days.includes(replacinDay(dayNameElement.innerText))) return;
                let hoursElements = dayNameElement ? dayDiv.nextElementSibling.querySelectorAll('span[dir="auto"]') : null;
                if (dayNameElement && hoursElements) {
                    let dayName = dayNameElement.innerText;
                    let hours = Array.from(hoursElements).map(el => el.innerText).join(', ');
                    if (hours.includes('c ') && hours.includes(' до ')) {
                        hours = hours.replaceAll('c ', '').replaceAll(' до ', ' to ').replaceAll('am','AM').replaceAll('pm','PM');
                    }
                    if (hours.includes('дп ') || hours.includes(' пп ')) {
                        hours = hours.replaceAll('дп','AM').replaceAll('пп','PM');
                    }
                    if (hours === 'ЗАКРЫТО' || hours === 'CLOSED' || hours === 'ЗАЧИНЕНО') hours = 'Closed';
                    hours = hours.replaceAll(' – ','-');
                    hoursInfo.push(`${replacinDay(dayName)}: ${hours}`);
                }
            });
            let hoursText = hoursInfo.join('\n');
            let formatted = formatHours(hoursText);
            if (formatted === "") throw new Error('Opening hours elements not found');
            if (copy) {
                navigator.clipboard.writeText(formatted);
                showSnackBar();
            }
            return formatted;
        } else {
            throw new Error('Day container not found');
            return "(maybe there is no time)";
        }
    }

    function deleteSuite(addressik) {
        return addressik.replace(/\s(Floor|Suite|Ste|Apt|Unit|Bldg|Fl|Rm|#|No)\s+[A-Za-z0-9]+/gi, '');
    }

    function copyJsonAddress(copy = true) {
        let result = "";
        try {
            let info = copyAddress(false);
            if (info.split(",").length < 4) info = ',' + info;
            let addresArray = info.split(",");
            let street = deleteSuite(addresArray[0].trim());
            let city = addresArray[1].trim();
            let stateAndPostal = addresArray[2].trim();
            let state = stateAndPostal.replace(/[^a-zа-я]+/gi, "");
            let postal = stateAndPostal.replace(/[^\d]+/g, "");
            let cc = "US";
            let country = "United States";
            result = `{'cc': '${cc}',\n'city': '${city}',\n'country': '${country}',\n'formatted_address': '${street}, ${city}, ${state}, ${country}',\n'formatted_city': '${city}, ${state}, ${country}',\n'postal_code': '${postal}',\n'state': '${state}',\n'street_address': '${street}'}`;
            if (copy) showSnackBar();
        } catch {
            throw new Error('Can\'t format to json');
        }
        if (copy) navigator.clipboard.writeText(result);
        return result;
    }

    function extractCoordinatesFromGoogleMapsUrl(url) {
        let regex = /@(-?\d+\.\d+),(-?\d+\.\d+),(\d+\.?\d*)z/;
        let regex2 = /@(-?\d+\.\d+),(-?\d+\.\d+),(\d+\.?\d*)m/;
        let regex3 = /@(-?\d+\.\d+),(-?\d+\.\d+),(\d+\.?\d*)a/;
        let match = url.match(regex) || url.match(regex2) || url.match(regex3);
        if (match) {
            let latitude = match[1];
            let longitude = match[2];
            let zoom = match[3];
            if (zoom < 19) return { latitude, longitude, zoom };
            if (zoom < 150) return { latitude, longitude, zoom: 19.5 };
            if (zoom < 190) return { latitude, longitude, zoom: 19 };
            if (zoom < 270) return { latitude, longitude, zoom: 18.5 };
            if (zoom < 370) return { latitude, longitude, zoom: 18 };
            if (zoom < 521) return { latitude, longitude, zoom: 17.5 };
            if (zoom < 740) return { latitude, longitude, zoom: 17 };
            if (zoom < 1100) return { latitude, longitude, zoom: 16.5 };
            if (zoom < 1500) return { latitude, longitude, zoom: 16 };
            if (zoom < 3000) return { latitude, longitude, zoom: 15.5 };
            if (zoom < 6000) return { latitude, longitude, zoom: 15 };
            if (zoom < 10000) return { latitude, longitude, zoom: 14 };
            return { latitude, longitude, zoom };
        } else {
            alert('Change from angle view to top view');
            throw new Error('Change from angle view to top view');
        }
    }

    function createOSMUrlFromCoordinates(latitude, longitude, zoom) {
        return `https://openstreetmap.placer.team/#map=${zoom}/${latitude}/${longitude}`;
    }

    async function openStreetMap() {
        let googleMapsUrl = window.location.href;
        try {
            let { latitude, longitude, zoom } = extractCoordinatesFromGoogleMapsUrl(googleMapsUrl);
            if (zoom <= 17.5) throw new Error('Zoom too small');
            let veUrl = createOSMUrlFromCoordinates(latitude, longitude, zoom);
            await delay(300);
            window.open(veUrl, '_blank');
        } catch (error) {
            if (error.message !== 'Change from angle view to top view') {
                if (confirm('Zoom is too high, are you sure? Zoom closer')) {
                    let { latitude, longitude, zoom } = extractCoordinatesFromGoogleMapsUrl(googleMapsUrl);
                    let veUrl = createOSMUrlFromCoordinates(latitude, longitude, zoom);
                    await delay(300);
                    window.open(veUrl, '_blank');
                    return;
                } else {
                    throw new Error('Zoom error');
                }
            }
            throw new Error('Zoom error');
        }
    }

    function createVEUrlFromCoordinates(latitude, longitude, zoom) {
        return `https://venues-prod.placer.team/#background=Bing&disable_features=deleted_venues,sources_layer,boundaries&map=${zoom}/${latitude}/${longitude}`;
    }

    async function venueEditor() {
        let googleMapsUrl = window.location.href;
        try {
            let { latitude, longitude, zoom } = extractCoordinatesFromGoogleMapsUrl(googleMapsUrl);
            if (zoom <= 17.5) throw new Error('Zoom too small');
            let veUrl = createVEUrlFromCoordinates(latitude, longitude, zoom);
            await delay(300);
            window.open(veUrl, '_blank');
        } catch (error) {
            if (error.message !== 'Change from angle view to top view') {
                if (confirm('Zoom is too high, are you sure? Zoom closer')) {
                    let { latitude, longitude, zoom } = extractCoordinatesFromGoogleMapsUrl(googleMapsUrl);
                    let veUrl = createVEUrlFromCoordinates(latitude, longitude, zoom);
                    await delay(300);
                    window.open(veUrl, '_blank');
                    return;
                } else {
                    throw new Error('Zoom error');
                }
            }
            throw new Error('Zoom error');
        }
    }

    function createGJUrlFromCoordinates(latitude, longitude, zoom) {
        return `https://geojson.io/#map=${zoom}/${latitude}/${longitude}`;
    }

    async function openGeoJson() {
        let googleMapsUrl = window.location.href;
        try {
            let { latitude, longitude, zoom } = extractCoordinatesFromGoogleMapsUrl(googleMapsUrl);
            if (zoom <= 17.5) throw new Error('Zoom too small');
            let veUrl = createGJUrlFromCoordinates(latitude, longitude, zoom);
            await delay(300);
            window.open(veUrl, '_blank');
        } catch (error) {
            if (error.message !== 'Change from angle view to top view') {
                if (confirm('Zoom is too high, are you sure? Zoom closer')) {
                    let { latitude, longitude, zoom } = extractCoordinatesFromGoogleMapsUrl(googleMapsUrl);
                    let veUrl = createGJUrlFromCoordinates(latitude, longitude, zoom);
                    await delay(300);
                    window.open(veUrl, '_blank');
                    return;
                } else {
                    throw new Error('Zoom error');
                }
            }
            throw new Error('Zoom error');
        }
    }

    function createPlacerUrlFromCoordinates(latitude, longitude, zoom) {
        let adjustedZoom = Math.min(zoom, 17);
        let latDelta = 0.0005 * Math.pow(2, 18 - adjustedZoom);
        let lngDelta = 0.0007 * Math.pow(2, 18 - adjustedZoom);
        latitude = parseFloat(latitude);
        longitude = parseFloat(longitude);
        let neLat = latitude + latDelta;
        let neLng = longitude + lngDelta;
        let swLat = latitude - latDelta;
        let swLng = longitude - lngDelta;
        return `https://analytics.placer.ai/#!/admin/explore2/?params=%7B%22type%22:%22complexes%22,%22center%22:%7B%22lat%22:${latitude},%22lng%22:${longitude}%7D,%22ne%22:%22${neLat},${neLng}%22,%22sw%22:%22${swLat},${swLng}%22,%22zoom%22:${adjustedZoom}%7D`;
    }

    function openPlacerMapUrl() {
        let googleMapsUrl = window.location.href;
        try {
            let { latitude, longitude, zoom } = extractCoordinatesFromGoogleMapsUrl(googleMapsUrl);
            let placerUrl = createPlacerUrlFromCoordinates(latitude, longitude, zoom);
            window.open(googleMapsUrl, '_blank');
            window.location.href = placerUrl;
        } catch (error) {
            if (error.message !== 'Change from angle view to top view') alert('Zoom closer');
            throw new Error('Zoom error');
        }
    }

    function addSnackBarToPage() {
        const snackBarHTML = `<span id="snackbar">Successfully Copied</span>`;
        document.body.insertAdjacentHTML('beforeend', snackBarHTML);
    }

    function showSnackBar() {
        var sb = document.getElementById("snackbar");
        sb.className = "show";
        setTimeout(() => sb.className = sb.className.replace("show", ""), 3000);
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function successStyle(button) {
        button.style.backgroundColor = '#00FF00';
    }

    function errorStyle(button) {
        button.style.backgroundColor = 'red';
    }

    // Popup window for Building At options
    function showBuildingAtPopup() {
        let existingPopup = document.getElementById('buildingAtPopup');
        if (existingPopup) existingPopup.remove();

        const options = [
            { text: 'Building At', handler: copyBuildingAt },
            { text: 'Office At', handler: copyOfficeAt },
            { text: 'Industrial At', handler: copyIndustrialAt },
            { text: 'Warehouse At', handler: copyWarehouseAt },
            { text: 'Distribution Center At', handler: copyDistributionCenterAt },
            { text: 'Factory At', handler: copyFactoryAt },
            { text: 'Residential Building At', handler: copyResidentialBuildingAt }
        ];

        let popup = document.createElement('div');
        popup.id = 'buildingAtPopup';
        popup.style.position = 'fixed';
        popup.style.top = '50%';
        popup.style.left = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.backgroundColor = '#fff';
        popup.style.border = '1px solid #ccc';
        popup.style.borderRadius = '5px';
        popup.style.padding = '10px';
        popup.style.zIndex = '1000';
        popup.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';

        let title = document.createElement('h3');
        title.innerText = 'Select Building Type';
        title.style.margin = '0 0 10px 0';
        popup.appendChild(title);

        options.forEach(option => {
            let button = document.createElement('button');
            button.innerText = option.text;
            button.className = 'popup-button';
            button.style.display = 'block';
            button.style.width = '100%';
            button.style.margin = '5px 0';
            button.style.padding = '8px';
            button.style.backgroundColor = '#f8f8f8';
            button.style.border = '1px solid #ccc';
            button.style.borderRadius = '3px';
            button.style.cursor = 'pointer';
            button.title = `Copy "${option.handler(false)}"`;
            button.onclick = async () => {
                try {
                    await option.handler();
                    successStyle(button);
                    setTimeout(() => popup.remove(), 300);
                } catch (error) {
                    errorStyle(button);
                    console.error(error);
                }
            };
            popup.appendChild(button);
        });

        let closeButton = document.createElement('button');
        closeButton.innerText = 'Close';
        closeButton.style.marginTop = '10px';
        closeButton.style.width = '100%';
        closeButton.style.padding = '8px';
        closeButton.style.backgroundColor = '#e0e0e0';
        closeButton.style.border = '1px solid #ccc';
        closeButton.style.borderRadius = '3px';
        closeButton.style.cursor = 'pointer';
        closeButton.onclick = () => popup.remove();
        popup.appendChild(closeButton);

        document.body.appendChild(popup);
    }

    async function addButtonToContainer() {
        let container = document.querySelector('.lMbq3e h1.DUwDvf.lfPIob');
        const sections = document.querySelectorAll('.OqCZI.fontBodyMedium');
        if (!container && sections.length != 0) {
            sections.forEach(section => {
                const header = section.querySelector('.MkV9');
                const hoursTable = section.querySelector('.eK4R0e');
                if (header && hoursTable && header.querySelectorAll('button.custom-button').length === 0) {
                    const button = document.createElement('button');
                    button.className = 'custom-button';
                    let title = 'Copy formatted opening hours\n' + copyOH(false, hoursTable);
                    button.title = title;
                    button.innerHTML = `<img src="https://toppng.com/uploads/preview/ink-pink-clock-clip-art-flexible-working-hours-ico-11563426366wt3lfgsvlc.png" class="button-icon"> Opening Hours`;
                    button.addEventListener('click', () => {
                        event.stopPropagation();
                        try {
                            successStyle(button);
                            copyOH(true, hoursTable);
                        } catch (error) {
                            errorStyle(button);
                            console.error(error);
                        }
                    });
                    header.appendChild(button);
                }
            });
        }
        if (container && container.querySelector('.button-container') === null) {
            let copy_name = 'Copy name: "' + copyName(false) + '"';
            let copy_address = 'Copy address: "' + copyAddress(false) + '"';
            let copy_oh = 'Copy formatted opening hours, if u get error, expand Hours';
            try { copy_oh = 'Copy formatted opening hours, if u get error, expand Hours\n' + copyOH(false) + '\nRight Mouse Click = mo-su 00:00-24:00'; } catch { console.log("cant find hours"); }
            let grand_opening = 'Google search for Grand Opening: "' + copyName(false) + ' ' + copyAddress(false) + ' Grand Opening"';
            let leasing = 'Google search for Leasing: "leasing ' + copyAddress(false) + '"';
            const buttonsData = [
                { text: 'Name', handler: copyName, tooltip: copy_name },
                { text: 'Address', handler: copyAddress, tooltip: copy_address },
                { text: 'Opening Hours', handler: copyOH, tooltip: copy_oh },
                { text: 'Grand Opening', handler: searchGrandOpening, icon: 'https://static.thenounproject.com/png/5113532-200.png', tooltip: grand_opening },
                { text: 'Leasing', handler: searchLeasing, icon: 'https://cdn.icon-icons.com/icons2/2248/PNG/512/floor_plan_icon_135611.png', tooltip: leasing },
                { text: 'Venue Editor', handler: venueEditor, icon: 'https://venues-prod.placer.team/img/favicon.ico', tooltip: 'Open Venue Editor at the same coordinates' },
                { text: 'Complex', handler: showAdditionalButtons, icon: 'https://analytics.placer.team/admin/static/admin-favicon.png', tooltip: 'Show tools for Complex' }
            ];

            let buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';

            let infoHeader = document.createElement('div');
            infoHeader.className = 'section-header';
            infoHeader.innerText = '–––Copy Info–––';
            buttonContainer.appendChild(infoHeader);

            let infoButtons = document.createElement('div');
            infoButtons.className = 'button-row';
            buttonsData.slice(0, 3).forEach(data => {
                let button = createButton(data);
                infoButtons.appendChild(button);
            });
            buttonContainer.appendChild(infoButtons);

            let searchHeader = document.createElement('div');
            searchHeader.className = 'section-header';
            searchHeader.innerText = '–––Google Search–––';
            buttonContainer.appendChild(searchHeader);

            let searchButtons = document.createElement('div');
            searchButtons.className = 'button-row';
            buttonsData.slice(3, 5).forEach(data => {
                let button = createButton(data);
                searchButtons.appendChild(button);
            });
            buttonContainer.appendChild(searchButtons);

            let editorsHeader = document.createElement('div');
            editorsHeader.className = 'section-header';
            editorsHeader.innerText = '–––Open Editors–––';
            buttonContainer.appendChild(editorsHeader);

            let editorButtons = document.createElement('div');
            editorButtons.className = 'button-row';
            buttonsData.slice(5).forEach(data => {
                let button = createButton(data);
                editorButtons.appendChild(button);
            });
            buttonContainer.appendChild(editorButtons);

            container.appendChild(buttonContainer);

            const openingHoursButton = container.querySelector('.button-container .button-row button:nth-child(3)');
            if (openingHoursButton) {
                openingHoursButton.addEventListener('contextmenu', async (event) => {
                    event.preventDefault();
                    try {
                        await navigator.clipboard.writeText("mo-su 00:00-24:00");
                        successStyle(openingHoursButton);
                    } catch (error) {
                        errorStyle(openingHoursButton);
                        console.error(error);
                    }
                });
            }
        }
    }

    function addYelpButton() {
        let container = document.querySelector('h2.y-css-1iiiexg');
        if (container && container.querySelectorAll('button').length === 0) {
            let copy_oh = 'Copy formatted opening hours';
            try { copy_oh = 'Copy formatted opening hours\n' + copyYelpOH(false); } catch { console.log("cant find hours"); }
            const data = { text: 'Opening Hours', handler: copyYelpOH, icon: 'https://toppng.com/uploads/preview/ink-pink-clock-clip-art-flexible-working-hours-ico-11563426366wt3lfgsvlc.png', tooltip: copy_oh };
            let button = document.createElement('button');
            button.innerHTML = `<img src="${data.icon}" class="button-icon"> ${data.text}`;
            button.className = 'custom-button';
            button.title = data.tooltip || data.text;
            button.onclick = async () => {
                try {
                    await data.handler();
                    successStyle(button);
                } catch (error) {
                    console.error(error);
                    errorStyle(button);
                }
            };
            container.appendChild(button);
        }
    }

    function addYelpUpdateButton() {
        let container = document.querySelector('.u-nowrap[for="attr_BusinessHours"]');
        let dayHoursContainer = document.querySelector('.day-hours');
        let existingButton = container && container.parentElement.querySelector('.custom-button');
        if (container && dayHoursContainer && !existingButton) {
            let copy_oh = 'Copy formatted opening hours';
            try { copy_oh = 'Copy formatted opening hours\n' + copyYelpUpdateOH(false); } catch { console.log("cant find hours"); }
            const data = { text: 'Opening Hours', handler: copyYelpUpdateOH, icon: 'https://toppng.com/uploads/preview/ink-pink-clock-clip-art-flexible-working-hours-ico-11563426366wt3lfgsvlc.png', tooltip: copy_oh };
            let button = document.createElement('button');
            button.type = 'button';
            button.innerHTML = `<img src="${data.icon}" class="button-icon"> ${data.text}`;
            button.className = 'custom-button';
            button.title = data.tooltip || data.text;
            button.onclick = async () => {
                try {
                    await data.handler();
                    successStyle(button);
                } catch (error) {
                    console.error(error);
                    errorStyle(button);
                }
            };
            container.appendChild(button);
        }
    }

    function addFBB() {
        let container = document.querySelector('div.x6s0dn4.x9f619.x78zum5.x5yr21d.x1pi30zi.x1swvt13.xl56j7k');
        if (container && container.querySelectorAll('button').length === 0) {
            let copy_oh = 'Copy formatted opening hours';
            try { copy_oh = 'Copy formatted opening hours\n' + copyFBHours(false); } catch { console.log("cant find hours"); }
            const data = { text: 'Opening Hours', handler: copyFBHours, tooltip: copy_oh };
            let button = document.createElement('button');
            button.innerHTML = `<class="button-icon"> ${data.text}`;
            button.className = 'custom-button';
            button.title = data.tooltip || data.text;
            button.onclick = async () => {
                try {
                    await data.handler();
                    successStyle(button);
                } catch (error) {
                    console.error(error);
                    errorStyle(button);
                }
            };
            container.appendChild(button);
        }
    }

    function createButton(data) {
        let button = document.createElement('button');
        button.innerHTML = data.icon ? `<img src="${data.icon}" class="button-icon"> ${data.text}` : data.text;
        button.className = 'custom-button';
        button.title = data.tooltip || data.text;
        button.onclick = async () => {
            try {
                successStyle(button);
                await data.handler();
            } catch (error) {
                console.error(error);
                errorStyle(button);
            }
        };
        return button;
    }

    async function showAdditionalButtons() {
        let container = document.querySelector('.lMbq3e h1.DUwDvf.lfPIob');
        let buttonContainer = container.querySelector('.button-container');
        let complexButton = Array.from(buttonContainer.querySelectorAll('button')).find(button => button.innerHTML.includes('Complex'));
        if (complexButton) {
            successStyle(complexButton);
            await delay(300);
            complexButton.remove();
        }
        let buildingAtTooltip = 'Open a menu to copy different building types';
        let jsonAddressTooltip = 'Copy address as JSON\n' + copyJsonAddress(false);
        const buttonsData = [
            { text: 'OSM', handler: openStreetMap, icon: 'https://openstreetmap.placer.team/assets/osm_logo-0e19527a1cc9fdf566c217d6e1863d88cac7bb743914792dea5d8db813501ad6.png', tooltip: 'Open OpenStreetMap at the same coordinates' },
            { text: 'Analytic', handler: openPlacerMapUrl, icon: 'https://analytics.placer.ai/favicon/favicon-32x32.png?v=2', tooltip: 'Open - analytics.placer.ai at the same coordinates' },
            { text: 'GeoJson', handler: openGeoJson, icon: 'https://geojson.io/img/favicon.png', tooltip: 'Open geojson.io at the same coordinates' },
            { text: 'Building At', handler: showBuildingAtPopup, icon: 'https://cdn-icons-png.flaticon.com/128/25/25694.png', tooltip: buildingAtTooltip },
            { text: 'JsonAddress', handler: copyJsonAddress, icon: 'https://analytics.placer.team/admin/static/admin-favicon.png', tooltip: jsonAddressTooltip }
        ];
        let editorButtonRow = Array.from(buttonContainer.querySelectorAll('.button-row')).find(row => row.querySelector('button') && row.querySelector('button').innerHTML.includes('Venue Editor'));
        if (editorButtonRow) {
            buttonsData.slice(0, 1).forEach(data => {
                let button = createButton(data);
                editorButtonRow.appendChild(button);
            });
            let firstNewButtonsRow = document.createElement('div');
            firstNewButtonsRow.className = 'button-row';
            buttonsData.slice(1, 3).forEach(data => {
                let button = createButton(data);
                firstNewButtonsRow.appendChild(button);
            });
            buttonContainer.appendChild(firstNewButtonsRow);
            let secondNewButtonsRow = document.createElement('div');
            secondNewButtonsRow.className = 'button-row';
            buttonsData.slice(3).forEach(data => {
                let button = createButton(data);
                secondNewButtonsRow.appendChild(button);
            });
            buttonContainer.appendChild(secondNewButtonsRow);
        }
    }

    async function checkAndAddButtons() {
        while (true) {
            if (window.location.href.includes('google')) await addButtonToContainer();
            if (window.location.href.includes('https://www.yelp')) {
                try {
                    await addYelpButton();
                    await addYelpUpdateButton();
                } catch (error) {}
            }
            if (window.location.href.includes('https://www.facebook')) await addFBB();
            await delay(2000);
        }
    }

    const style = document.createElement('style');
    style.innerHTML = `
        .custom-button {
            margin: 2px;
            padding: 10px 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            cursor: pointer;
            background-color: #f8f8f8;
            font-size: 14px;
            transition: background-color 0.3s ease;
            display: flex;
            align-items: center;
        }
        .custom-button:hover { background-color: #e0e0e0; }
        .button-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
            margin-top: 0px;
        }
        .button-row { display: flex; gap: 3px; }
        .section-header {
            font-weight: normal;
            font-size: 12px;
            text-align: center;
            margin: 0px 0;
        }
        .button-icon { width: 20px; height: 20px; margin-right: 10px; }
        .custom-button:active, .custom-button.active {
            transform: scale(1.1);
            background-color: #d0d0d0;
        }
        #snackbar {
            visibility: hidden;
            color: #fff;
            background-color: #333;
            min-width: 250px;
            margin-left: -125px;
            border-radius: 2px;
            padding: 16px;
            text-align: center;
            left: 50%;
            bottom: 30px;
            z-index: 1;
            position: fixed;
        }
        #snackbar.show {
            visibility: visible;
            -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
            animation: fadein 0.5s, fadeout 0.5s 2.5s;
        }
        @-webkit-keyframes fadein {
            from {bottom: 0; opacity: 0;}
            to {bottom: 30px; opacity: 1;}
        }
        @keyframes fadein {
            from {bottom: 0; opacity: 0;}
            to {bottom: 30px; opacity: 1;}
        }
        @-webkit-keyframes fadeout {
            from {bottom: 30px; opacity: 1;}
            to {bottom: 0; opacity: 0;}
        }
        @keyframes fadeout {
            from {bottom: 30px; opacity: 1;}
            to {bottom: 0; opacity: 0;}
        }
        .popup-button:hover { background-color: #e0e0e0; }
    `;
    document.head.appendChild(style);
    addSnackBarToPage();
    checkAndAddButtons();
})();
