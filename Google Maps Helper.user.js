(function() {
    'use strict';

    function copyName(copy = true) {
        let placeName = document.querySelector('h1.DUwDvf.lfPIob');
        if (!placeName) throw new Error('Place information not found');

        let info = placeName.cloneNode(true);

        let buttonContainer = info.querySelector('.button-container');
        if (buttonContainer) {
            buttonContainer.remove();
        }

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
    try {
        let addressElement = document.querySelector('div.Io6YTe.fontBodyMedium.kR99db');
        if (addressElement && !addressElement.innerText.includes('Confirm or fix this location')) {
            let info = addressElement.innerText.trim();
            if (copy) {
                navigator.clipboard.writeText(info);
                showSnackBar();
            }
            return info;
        }

        addressElement = document.querySelector('span.DkEaL');
        if (addressElement) {
            let info = addressElement.innerText.trim();
            if (copy) {
                navigator.clipboard.writeText(info);
                showSnackBar();
            }
            return info;
        }

        addressElement = document.querySelector('div.Y4SsEe');
        if (addressElement) {
            if (addressElement.ariaLabel && addressElement.ariaLabel.includes('Confirm or fix this location')) {
                addressElement = document.querySelector('span.DkEaL');
            }
            if (addressElement && addressElement.ariaLabel) {
                let info = addressElement.ariaLabel.replace('Address, ', '').trim();
                if (copy) {
                    navigator.clipboard.writeText(info);
                    showSnackBar();
                }
                return info;
            }
        }
    } catch (error) {
        console.log(error);
    }
    return "";
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

    function regroupAndFormat(hoursByDay) {
        const days = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];

        const allDaysPresent = days.every(day => hoursByDay.hasOwnProperty(day));
        if (allDaysPresent && days.every(day => hoursByDay[day] === "00:00-24:00")) {
             return "mo-su 00:00-24:00";
        }

        const allHours = Object.values(hoursByDay).filter(h => h);
        let uniqueHours = [...new Set(allHours)];
        let result = "";

        for (let i = 0; i < uniqueHours.length; i++) {
            let sameDays = [];

            for (let j = 0; j < 7; j++) {
                const currentDay = days[j];
                if (hoursByDay.hasOwnProperty(currentDay) && hoursByDay[currentDay] === uniqueHours[i]) {
                    sameDays.push(currentDay);
                }
            }

            let groupedDays = [];
            let startDay = sameDays[0];
            let endDay = sameDays[0];

            if (!startDay) continue;

            for (let k = 1; k < sameDays.length; k++) {
                const currentDayIndexInShortDays = days.indexOf(sameDays[k]);
                const previousDayIndexInShortDays = days.indexOf(endDay);

                if (currentDayIndexInShortDays === (previousDayIndexInShortDays + 1) % 7) {
                    endDay = sameDays[k];
                } else {
                    groupedDays.push(startDay === endDay ? startDay : `${startDay}-${endDay}`);
                    startDay = sameDays[k];
                    endDay = sameDays[k];
                }
            }
            if (startDay) {
                groupedDays.push(startDay === endDay ? startDay : `${startDay}-${endDay}`);
            }

            result += `${groupedDays.join(",")}${uniqueHours[i] ? ' ' + uniqueHours[i] : ''}`;
            if (i < uniqueHours.length - 1) result += "; ";
        }

        return result.trim();
    }

    function formatHours(hoursText) {
        if (!hoursText || hoursText.trim() === "") return "";
        let hoursLines = hoursText.trim().split('\n');
        let days = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];
        let sortedHoursByDay = {};

        hoursLines.forEach(line => {
            let parts = line.split(': ');
            if (parts.length < 2) return;

            let day = parts[0];
            let hoursRaw = parts.slice(1).join(': ');

            let shortDay = day.toLowerCase().substr(0, 2);

            if (hoursRaw.includes('Closed')) return;

            let hoursNormalized = hoursRaw
                .replace(/\sto\s/gi, '-')
                .replace(/,\s/g, ',');

            let is12HourFormat = hoursNormalized.match(/(am|pm|дп|пп|a\.m\.|p\.m\.)/i);

            let convertedHours;
            if (is12HourFormat) {
                let intervals = hoursNormalized.split(',');
                convertedHours = intervals.map(interval => {
                    let cleanedInterval = interval.trim().replace(/\s/g, '').replace('–', '-');
                    return convertTo24Hour(cleanedInterval);
                }).join(',');
            } else {
                convertedHours = hoursNormalized.replace(/(\d{1,2})[hH]/, '$1:00');
                if (convertedHours === "Open 24 hours") {
                    convertedHours = "00:00-24:00";
                }
            }

            sortedHoursByDay[shortDay] = convertedHours;
        });

        let hoursByDay = {};
        days.forEach(day => {
            if (sortedHoursByDay.hasOwnProperty(day)) hoursByDay[day] = sortedHoursByDay[day];
        });

        return regroupAndFormat(hoursByDay);
    }

    function convertTo24Hour(time12h) {
        time12h = String(time12h).toUpperCase()
            .replace(/\s/g, '')
            .replace('–', '-');

        if (!time12h.match(/(AM|PM|ДП|ПП|A\.M\.|P\.M\.)/i) && time12h.includes('-')) {
            return time12h;
        }

        const convertSingleTime = (t) => {
            let timePart = t.replace(/(AM|PM|ДП|ПП|A\.M\.|P\.M\.)/i, '');
            let modifier = t.match(/(AM|PM|ДП|ПП|A\.M\.|P\.M\.)/i)?.[0] || '';

            let [hours, minutes] = timePart.includes(":") ? timePart.split(':') : [timePart, '00'];

            hours = parseInt(hours, 10);
            minutes = minutes === '' ? '00' : minutes.padStart(2, '0');

            if (modifier.match(/PM|ПП|P\.M\./i) && hours !== 12) {
                hours += 12;
            } else if (modifier.match(/AM|ДП|A\.M\./i) && hours === 12) {
                hours = 0;
            }

            return `${String(hours).padStart(2, '0')}:${minutes}`;
        };

        if (time12h.includes('-')) {
            const [time1, time2] = time12h.split('-');

            let time2WithModifier = time2;
            if (!time2.match(/(AM|PM|ДП|ПП|A\.M\.|P\.M\.)/i)) {
                let modifier = time1.match(/(AM|PM|ДП|ПП|A\.M\.|P\.M\.)/i)?.[0];
                if (modifier) {
                    time2WithModifier += modifier;
                }
            }

            let t1 = convertSingleTime(time1);
            let t2 = convertSingleTime(time2WithModifier);

            if (t2 === '00:00' && t1 !== '00:00' && (time2.includes('12') || time2WithModifier.includes('12'))) {
                t2 = '24:00';
            }

            return `${t1}-${t2}`;
        } else {
            return convertSingleTime(time12h);
        }
    }

    function getHoursText(scopeElement) {
        const root = scopeElement || document;

        let dayContainer = root.querySelector('.eK4R0e');
        if (dayContainer) {
            let dayElements = dayContainer.querySelectorAll('tr.y0skZc');
            if (dayElements && dayElements.length > 0) {
                let hoursInfo = [];
                dayElements.forEach(day => {
                    let dayName = day.querySelector('td.ylH6lf div').innerText;
                    let hours = day.querySelector('td.mxowUb').ariaLabel
                        .split(',')
                        .filter(part => !part.includes('Hours might differ') && !part.includes('Holiday hours'))
                        .join(',');
                    hoursInfo.push(`${dayName}: ${hours}`);
                });
                return hoursInfo.join('\n');
            }
        }

        if (root === document) {
            const hoursSections = root.querySelectorAll('div[data-md*="open hours"], div[aria-label]');
            let foundHoursText = '';
            const dayNamesRegex = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Понеділок|Вівторок|Середа|Четвер|П’ятниця|Субота|Неділя|Понедельник|Вторник|Среда|Четверг|Пятница|Суббота|Воскресенье)/i;

            hoursSections.forEach(section => {
                const potentialDayRows = section.querySelectorAll('div[aria-label], span[aria-label]');

                potentialDayRows.forEach(element => {
                    let ariaLabel = element.getAttribute('aria-label');
                    if (ariaLabel && ariaLabel.match(dayNamesRegex)) {
                        if (ariaLabel.includes(':')) {
                            let [dayName, hours] = ariaLabel.split(':').map(s => s.trim());
                            if (hours && hours.match(/(\d{1,2}:\d{2}|\d{1,2})/)) {
                                foundHoursText += `${dayName}: ${hours}\n`;
                            }
                        }
                    }
                });
            });

            if (foundHoursText.trim() !== '') {
                return foundHoursText.trim();
            }

            let category = document.querySelector('.skqShb .fontBodyMedium');
            if (category && category.nextElementSibling) {
                let next = category.nextElementSibling;
                let text = next.innerText;
                if (text === 'Building' || text === 'Park' || text === 'Shopping mall' || text === 'Житловий будинок') {
                    return 'mo-su 00:00-24:00';
                }
            }
        }

        throw new Error('Opening hours not found or not expanded');
    }

    function getFormattedHours(scopeElement) {
        let hoursText;
        try {
            hoursText = getHoursText(scopeElement);
        } catch (error) {
            const root = scopeElement || document;
            const holidayElement = root.querySelector('.rYsDIf');
            if (holidayElement && holidayElement.innerText.includes("Holiday hours")) {
                 throw new Error("Could not parse hours due to Holiday hours detected.");
            }
            throw error;
        }

        let formatted = formatHours(hoursText);
        if (formatted === "") {
            throw new Error("Opening hours elements not found");
        }
        return formatted;
    }

    function showHolidayWarningPopup(defaultHours) {
        return new Promise((resolve, reject) => {
            let existingPopup = document.getElementById('holidayWarningPopup');
            if (existingPopup) existingPopup.remove();

            const options = [
                {
                    text: 'Скопіювати регулярні години (якщо знайдені)',
                    value: defaultHours,
                    tooltip: `Буде скопійовано: ${defaultHours}`
                }
            ];


            let popup = document.createElement('div');
            popup.id = 'holidayWarningPopup';
            popup.style.cssText = `
                position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                background-color: #fff; border: 3px solid #f90; border-radius: 8px;
                padding: 15px; z-index: 10000; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                width: 300px; text-align: center;
            `;

            let title = document.createElement('h3');
            title.innerText = '⚠️ Виявлено Святкові Години!';
            title.style.cssText = 'color: #c00; margin-top: 0;';
            popup.appendChild(title);

            let warning = document.createElement('p');
            warning.innerHTML = `Google показує **"Holiday hours"**. Регулярні години: <strong>${defaultHours}</strong>. Оберіть дію:`;
            warning.style.cssText = 'margin-bottom: 15px; font-size: 14px;';
            popup.appendChild(warning);

            options.forEach(option => {
                let button = document.createElement('button');
                button.innerText = option.text;
                button.title = option.tooltip;
                button.className = 'popup-button';

                let bgColor = '#ccf';

                button.style.cssText = `
                    display: block; width: 98%; margin: 5px auto; padding: 10px;
                    background-color: ${bgColor};
                    border: 1px solid #ccc; border-radius: 5px; cursor: pointer;
                `;
                button.onclick = () => {
                    popup.remove();
                    resolve(option.value);
                };
                popup.appendChild(button);
            });

            let cancelButton = document.createElement('button');
            cancelButton.innerText = 'Скасувати Копіювання (Нічого не робити)';
            cancelButton.style.cssText = 'margin-top: 15px; width: 98%; padding: 10px; background-color: #ddd; border: 1px solid #ccc; border-radius: 5px; cursor: pointer;';
            cancelButton.onclick = () => {
                popup.remove();
                reject('User cancelled holiday warning.');
            };
            popup.appendChild(cancelButton);

            document.body.appendChild(popup);
        });
    }


    async function copyOH(copy = true, scopeElement = null) {
        let formatted;
        try {
            formatted = getFormattedHours(scopeElement);
        } catch (error) {
            if (error.message.includes("Opening hours not found") && copy) {
                alert("Opening hours not found or not expanded. Please expand hours to see time.");
            }
            if (error.message.includes("Holiday hours detected.") && copy) {
                 formatted = 'N/A - Regular hours unknown';
            } else {
                 throw error;
            }
        }

        let finalFormatted = formatted;

        const holidayElement = (scopeElement || document).querySelector('.rYsDIf');
        if (holidayElement && holidayElement.innerText.includes("Holiday hours") && copy) {
            try {
                finalFormatted = await showHolidayWarningPopup(formatted);
            } catch (e) {
                return formatted;
            }
        }

        if (copy) {
            navigator.clipboard.writeText(finalFormatted);
            showSnackBar();
        }

        return finalFormatted;
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

        if (!copy) {
            return "N/A - Yelp Update Hours";
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
        let dayContainer = document.querySelectorAll('.xyorhqc .x9f619 .x78zum5.x5yr21d.x1pi30zi.x1swvt13.xl56j7k');
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

        if (!info || typeof info !== 'string') {
            throw new Error("Address info is empty or invalid");
        }

        if (info.split(",").length < 4) info = ',' + info;
        let addresArray = info.split(",");
        let street = deleteSuite(addresArray[0].trim());
        let city = addresArray[1]?.trim() || "";
        let stateAndPostal = addresArray[2]?.trim() || "";
        let state = stateAndPostal.replace(/[^a-zа-я]+/gi, "");
        let postal = stateAndPostal.replace(/[^\d]+/g, "");
        let cc = "US";
        let country = "United States";

        const obj = {
            cc: cc,
            city: city,
            country: country,
            formatted_address: `${street}, ${city}, ${state}, ${country}`,
            formatted_city: `${city}, ${state}, ${country}`,
            postal_code: postal,
            state: state,
            street_address: street
        };

        result = JSON.stringify(obj, null, 2);

        if (copy) showSnackBar();
    } catch (e) {
        console.error("Can't format to json:", e);
        throw e;
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
        window.open(placerUrl, '_blank');
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

            let tooltipText;
            try {
                tooltipText = `Copy "${option.handler(false)}"`;
            } catch (e) {
                tooltipText = "Address not found";
            }
            button.title = tooltipText;

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

                    let title = 'Copy formatted opening hours';
                    try {
                        title = 'Copy formatted opening hours\n' + getFormattedHours(section);
                    } catch (e) {
                        console.log('cant find hours for section tooltip');
                    }

                    button.title = title;
                    button.innerHTML = `<img src="https://toppng.com/uploads/preview/ink-pink-clock-clip-art-flexible-working-hours-ico-11563426366wt3lfgsvlc.png" class="button-icon"> Opening Hours`;
                    button.addEventListener('click', () => {
                        event.stopPropagation();
                        try {
                            successStyle(button);
                            copyOH(true, section);
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
            try {
                let hoursText = getFormattedHours();
                copy_oh = 'Copy formatted opening hours, if u get error, expand Hours\n' + hoursText + '\nRight Mouse Click = mo-su 00:00-24:00';
            } catch (e) {
                console.log("Can't find hours for tooltip:", e.message);
            }


            let jsonAddressTooltip;
            try {
                jsonAddressTooltip = 'Copy address as JSON\n' + copyJsonAddress(false);
            } catch (error) {
                jsonAddressTooltip = 'Copy address as JSON\n (N/A - address not found)';
            }

            let buildingAtTooltip = 'Open a menu to copy different building types';

            const additionalButtonsData = [
                { text: 'Analytic', handler: openPlacerMapUrl, icon: 'https://analytics.placer.ai/favicon/favicon-32x32.png?v=2', tooltip: 'Open - analytics.placer.ai at the same coordinates' },
                { text: 'Building At', handler: showBuildingAtPopup, icon: 'https://cdn-icons-png.flaticon.com/128/25/25694.png', tooltip: buildingAtTooltip },
                { text: 'JsonAddress', handler: copyJsonAddress, icon: 'https://analytics.placer.team/admin/static/admin-favicon.png', tooltip: jsonAddressTooltip }
            ];

            const buttonsData = [
                { text: 'Name', handler: copyName, tooltip: copy_name },
                { text: 'Address', handler: copyAddress, tooltip: copy_address },
                { text: 'Opening Hours', handler: copyOH, tooltip: copy_oh },
                ...additionalButtonsData
            ];

            let buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';

            let infoHeader = document.createElement('div');
            infoHeader.className = 'section-header';
            infoHeader.innerText = '–––Copy Info & Tools–––';
            buttonContainer.appendChild(infoHeader);

            let buttonRow = document.createElement('div');
            buttonRow.className = 'button-row';
            buttonsData.forEach(data => {
                let button = createButton(data);
                buttonRow.appendChild(button);
            });
            buttonContainer.appendChild(buttonRow);

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
            let button = createButton(data);
            container.appendChild(button);
        }
    }

    function addYelpUpdateButtons() {
        let container = document.querySelector('.u-nowrap[for="attr_BusinessHours"]');
        let dayHoursContainer = document.querySelector('.day-hours');
        let existingButton = container && container.parentElement.querySelector('.custom-button');
        if (container && dayHoursContainer && !existingButton) {
            let copy_oh = 'Copy formatted opening hours';
            try { copy_oh = 'Copy formatted opening hours\n' + copyYelpOH(false); } catch { console.log("cant find hours"); }
            const data = { text: 'Opening Hours', handler: copyYelpOH, icon: 'https://toppng.com/uploads/preview/ink-pink-clock-clip-art-flexible-working-hours-ico-11563426366wt3lfgsvlc.png', tooltip: copy_oh };
            let button = createButton(data);
            container.appendChild(button);
        }
    }

    function addFacebookButton() {
        let container = document.querySelector('h3.x1heor9g.x1w99v1x.x1hl2dh5.x1h0z5lf.x1yik3gh.x1n2onr6.x1s3etdg.x1t2pt7d.x1ja2u2z');
        if (container && container.innerText.includes('Hours')) {
            if (container.parentElement.querySelectorAll('button').length === 0) {
                let copy_oh = 'Copy formatted opening hours';
                try { copy_oh = 'Copy formatted opening hours\n' + copyFBHours(false); } catch { console.log("cant find hours"); }
                const data = { text: 'Opening Hours', handler: copyFBHours, icon: 'https://toppng.com/uploads/preview/ink-pink-clock-clip-art-flexible-working-hours-ico-11563426366wt3lfgsvlc.png', tooltip: copy_oh };
                let button = createButton(data);
                container.parentElement.appendChild(button);
            }
        }
    }

    function createButton(data) {
        let button = document.createElement('button');
        button.type = 'button';
        button.innerHTML = data.icon ? `<img src="${data.icon}" class="button-icon"> ${data.text}` : data.text;
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
        return button;
    }

    function addGlobalStyles() {
        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
            .button-container {
                margin-top: 10px;
                padding-top: 10px;
                border-top: 1px solid #ccc;
                display: block;
                width: 100%;
            }
            .section-header {
                font-size: 14px;
                font-weight: bold;
                color: #555;
                margin-bottom: 5px;
                text-align: center;
            }
            .button-row {
                display: flex;
                flex-wrap: wrap;
                gap: 5px;
                justify-content: center;
            }
            .custom-button {
                background-color: #f0f0f0;
                color: #333;
                border: 1px solid #ccc;
                padding: 5px 10px;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.2s ease;
                font-size: 13px;
                display: flex;
                align-items: center;
                text-align: center;
                margin: 0px 0;
            }
            .button-icon {
                width: 20px;
                height: 20px;
                margin-right: 5px;
                filter: grayscale(100%);
            }
            .custom-button:hover {
                background-color: #e0e0e0;
                transform: scale(1.03);
            }
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
            .y-css-1iiiexg {
                display: flex;
                align-items: center;
            }
            .y-css-1iiiexg button.custom-button {
                margin-left: 10px;
            }
            .x1heor9g.x1w99v1x.x1hl2dh5.x1h0z5lf.x1yik3gh.x1n2onr6.x1s3etdg.x1t2pt7d.x1ja2u2z {
                display: flex;
                align-items: center;
            }
        `;
        document.head.appendChild(style);
    }

    function observeDOM() {
        if (window.location.host.includes('google.com')) {
            const targetNode = document.body;
            const config = { childList: true, subtree: true };
            const callback = function(mutationsList, observer) {
                addButtonToContainer();
            };
            const observer = new MutationObserver(callback);
            observer.observe(targetNode, config);
        } else if (window.location.host.includes('yelp.com')) {
            addYelpButton();
            addYelpUpdateButtons();
        } else if (window.location.host.includes('facebook.com')) {
            addFacebookButton();
        }
    }

    addGlobalStyles();
    addSnackBarToPage();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', observeDOM);
    } else {
        observeDOM();
    }
})();
