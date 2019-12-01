import pandas as pd
import json

scioly = pd.read_csv('birdlist', squeeze=True, header=None)[1]
ebird = pd.read_csv('https://ebird.org/ws2.0/ref/taxonomy/ebird?fmt=csv')

df = ebird[ebird['COMMON_NAME'].str.lower().isin(scioly.str.lower())]

print(json.dumps({
  "orders": {order: { "families": list(df[df['ORDER'] == order]['FAMILY_SCI_NAME'].unique()) } for order in df['ORDER'].unique()},
  "families": {family: { "commonName": df[df['FAMILY_SCI_NAME'] == family]['FAMILY_COM_NAME'].iloc[0], "species": list(df[df['FAMILY_SCI_NAME'] == family]['SPECIES_CODE'].unique()) } for family in df['FAMILY_SCI_NAME'].unique()},
  "species": {species['SPECIES_CODE']: { "commonName": species['COMMON_NAME'], "family": species["FAMILY_SCI_NAME"], "order": species["ORDER"] } for (_, species) in df.iterrows()}
}))
