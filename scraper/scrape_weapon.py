from bs4 import BeautifulSoup
import requests
import json
import csv

url_list = [
    'https://mhworld.kiranico.com/great-sword',
    'https://mhworld.kiranico.com/long-sword',
    'https://mhworld.kiranico.com/sword',
    'https://mhworld.kiranico.com/dual-blades',
    'https://mhworld.kiranico.com/hammer',
    'https://mhworld.kiranico.com/hunting-horn',
    'https://mhworld.kiranico.com/lance',
    'https://mhworld.kiranico.com/gunlance',
    'https://mhworld.kiranico.com/switch-axe',
    'https://mhworld.kiranico.com/charge-blade',
    'https://mhworld.kiranico.com/insect-glaive',
]

weapon_name_list = [
    '1', #GreatSword
    '2', #LongSword
    '3', #Sword
    '3', #DualBlades
    '4', #Hammer
    '5', #HuntingHorn
    '6', #Lance
    '7', #Gunlance
    '8', #SwitchAxe
    '9', #ChargeBlade
    '10', #InsectGlaive
]

universal_list = []
universal_string = ""
universal_counter = 0

def format_ele_damage(element):
    new_str = element.replace('\n', '').replace(' ', '').replace('(', '').replace(')', '')

    if new_str[0:3].isdigit():
        return new_str[0:3]
    elif new_str[0:2].isdigit():
        return new_str[0:2]
    else:
        return 0


def format_ele_type(element):
    new_str = element.replace('\n', '').replace(' ', '').replace('(', '').replace(')', '')
    digit_check = new_str[0:3].isdigit()

    if len(new_str) >= 11:          # String contains element and affinity
        if digit_check:
            return new_str[3:-12]
        else:
            return new_str[2:-12]
    elif len(new_str) >= 5:          # String only contains element damage
        if digit_check:
            return new_str[3:]
        else:
            return new_str[2:]


def get_values(table, outer_counter):
    global universal_counter
    weapon_list = []
    counter = 0
    weapon_affinity = 0

    for row in table.find_all('tr')[1:]:
        counter += 1
        universal_counter += 1

        weapon_name = row.find_all('td')[0].a.text
        bloat_damage = int(row.find_all('td')[1].text)
        real_damage = int(row.find_all('td')[2].text)
        unform_element = row.find_all('td')[3].find('small').text
        element_damage = int(format_ele_damage(unform_element))
        element_type = format_ele_type(unform_element)
        weapon_affinity_text = row.find('span', class_="text-danger")

        if weapon_affinity_text:
            weapon_affinity_text = weapon_affinity_text.text.replace('%', '')
            weapon_affinity = int(weapon_affinity_text)


        # weapon_list.append({
        #     'pk': counter,
        #     'model': "calculator." + weapon_name_list[weapon_index],
        #     'fields': {
        #         'name_text': weapon_name,
        #         'bloat_text': bloat_damage,
        #         'real_text': real_damage,
        #         'element_text': element_damage,
        #         'element_type_text': element_type,
        #         'affinity_text': weapon_affinity
        #     }
        # })

        # universal_list.append({
        #     'pk': universal_counter,
        #     'model': "calculator.Weapons",
        #     'fields': {
        #         'name_text': weapon_name,
        #         'bloat_text': bloat_damage,
        #         'real_text': real_damage,
        #         'element_text': element_damage,
        #         'element_type_text': element_type,
        #         'affinity_text': weapon_affinity
        #     }
        # })

        newLine = [
            universal_counter,
            weapon_name,
            bloat_damage,
            real_damage,
            element_damage,
            element_type,
            weapon_affinity,
            outer_counter
        ]

        writer.writerow(newLine)

    # print(weapon_list)
    # weapon_json = open(weapon_name_list[weapon_index] + '.json', "w")
    # json.dump(weapon_list, weapon_json)


def weapon_scrape():
    outer_counter = 0





    # iterate and scrape through weapon urls
    for weapon_url in url_list:
        source = requests.get(weapon_url).text
        soup = BeautifulSoup(source, 'lxml')
        table_soup = soup.find('table', class_='table table-sm')

        get_values(table_soup, outer_counter)
        outer_counter += 1

    # weapon_json = open('Weapons.json', 'w')
    # json.dump(universal_list, weapon_json)

    # with open('output.csv', 'w', encoding="utf-8") as f:
    #     writer = csv.writer(f, lineterminator='\n')
    #     writer.writerow(universal_list)

    print(universal_list)


# execute scrape
outfile = open('test.csv', 'w', encoding="utf-8", newline='')
writer = csv.writer(outfile)

weapon_scrape()

outfile.close()


