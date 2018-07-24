from bs4 import BeautifulSoup
import requests
import csv

monster_part_output_file = 'monster_part_list.csv'
monster_output_file = 'monster_list.csv'

monster_list_url = 'https://mhworld.kiranico.com/monster'

monster_list = []

url_list = []


def get_values(soup, outer_counter):
    '''
    :param soup: monster hit-zone table
    :param outer_counter: index of monster
    :return: none
    '''

    table = soup.find_all('table', class_='table table-sm')[1]

    newLine = [0] * 12

    for row in table.find_all('tr')[1:]:
        newLine[0] = monster_list[outer_counter-1]

        for counter, rowz in enumerate(row.find_all('td')):
            newLine[counter+1] = rowz.text

        newLine[-1] = outer_counter
        print(newLine)
        monster_part_writer.writerow(newLine)


# Scrape monster list for urls and fill url_list
def get_url():
    '''
    :return: none
    '''
    source = requests.get(monster_list_url).text
    soup = BeautifulSoup(source, 'lxml')

    body = soup.find('div', class_='card-body').find_all('a', href=True)

    for href in body:
        url_list.append(href['href'])
        monster_list.append(href.text)

    newLine = [0]*2
    for counter, monster in enumerate(monster_list):
        newLine[0] = counter+1;
        newLine[1] = monster
        monster_writer.writerow(newLine)



# Write all hitzones and values into output csv
def monster_scrape():
    outer_counter = 1

    get_url()

    # iterate and scrape through weapon urls
    for monster_url in url_list:
        source = requests.get(monster_url).text
        soup = BeautifulSoup(source, 'lxml')

        get_values(soup, outer_counter)
        outer_counter += 1


# execute scrape
monster_part_outfile = open(monster_part_output_file, 'w', encoding="utf-8", newline='')
monster_outfile = open(monster_output_file, 'w', encoding="utf-8", newline='')
monster_part_writer = csv.writer(monster_part_outfile)
monster_writer = csv.writer(monster_outfile)

monster_scrape()

monster_part_outfile.close()
monster_outfile.close()
