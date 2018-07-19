from bs4 import BeautifulSoup
import requests
import csv

output_file = 'monsters.csv'

monster_list_url = 'https://mhworld.kiranico.com/monster'

url_list = []


def get_values(soup, outer_counter):
    '''
    :param soup: monster hit-zone table
    :param outer_counter: index of monster
    :return: none
    '''

    name = soup.find('h1', itemprop="name").text
    table = soup.find_all('table', class_='table table-sm')[1]

    newLine = [0] * 11

    for row in table.find_all('tr')[1:]:
        for counter, rowz in enumerate(row.find_all('td')):
            newLine[counter] = rowz.text

        newLine[-1] = outer_counter
        writer.writerow(newLine)


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
outfile = open(output_file, 'w', encoding="utf-8", newline='')
writer = csv.writer(outfile)

monster_scrape()

outfile.close()
