from bs4 import BeautifulSoup
import requests
import csv

weapon_output_file = 'weapons.csv'
weapon_list_output_file = 'weapon_list.csv'
universal_counter = 0

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

weapon_list = [
    'Great Sword',
    'Long Sword',
    'Sword and Shield',
    'Dual Blades',
    'Hammer',
    'Hunting Horn',
    'Lance',
    'Gunlance',
    'Switch Axe',
    'Charge Blade',
    'Insect Glaive'
]


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

    if not digit_check:     # If no digits in front return empty
        return ''
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
    weapon_affinity = 0

    for row in table.find_all('tr')[1:]:
        universal_counter += 1

        weapon_name = row.find_all('td')[0].a.text
        bloat_damage = int(row.find_all('td')[1].text)
        real_damage = int(row.find_all('td')[2].text)

        # Special formatting for Gunlances
        if outer_counter is 7:
            unform_element = row.find_all('td')[3].find_all('div')[0].find_next_sibling('div')
        else:
            unform_element = row.find_all('td')[3].find('small').find('div')

        if unform_element is not None:
             unform_element = unform_element.text
        else:
            unform_element = ''


        element_damage = int(format_ele_damage(unform_element))
        element_type = format_ele_type(unform_element)
        weapon_affinity_text = row.find('span', class_="text-danger")

        if weapon_affinity_text:
            weapon_affinity_text = weapon_affinity_text.text.replace('%', '')
            weapon_affinity = int(weapon_affinity_text)

        newLine = [
            universal_counter,
            weapon_name,
            bloat_damage,
            real_damage,
            element_damage,
            element_type,
            weapon_affinity,
            outer_counter+1
        ]

        weapon_writer.writerow(newLine)


def weapon_scrape():
    counter = 0

    # iterate and scrape through weapon urls
    for weapon_url in url_list:
        source = requests.get(weapon_url).text
        soup = BeautifulSoup(source, 'lxml')
        table_soup = soup.find('table', class_='table table-sm')

        get_values(table_soup, counter)
        counter += 1


def weapon_list_create():
    newLine = [0]*2
    for counter, weapon in enumerate(weapon_list):
        newLine[0] = counter+1
        newLine[1] = weapon
        weapon_list_writer.writerow(newLine)


# execute scrape
weapon_outfile = open(weapon_output_file, 'w', encoding="utf-8", newline='')
weapon_list_outfile = open(weapon_list_output_file, 'w', encoding="utf-8", newline='')
weapon_writer = csv.writer(weapon_outfile)
weapon_list_writer = csv.writer(weapon_list_outfile)

weapon_scrape()
weapon_list_create()

weapon_outfile.close()
weapon_list_outfile.close()



