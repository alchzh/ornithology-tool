import Vue from 'vue'
import { mapValues, pickBy, every } from 'lodash'

export const state = () => ({
  filterGroups: {
    age: {
      filters: {
        a: { label: 'Adult', enabled: false },
        i: { label: 'Immature', enabled: false },
        j: { label: 'Juvenile', enabled: false },
        u: { label: 'Unknown', enabled: false }
      },
      label: 'Age'
    },
    sex: {
      filters: {
        m: { label: 'Male', enabled: false },
        f: { label: 'Female', enabled: false },
        u: { label: 'Unknown', enabled: false }
      },
      label: 'Sex'
    },
    beh: {
      filters: {
        e: { label: 'Foraging or Eating', enabled: false },
        f: { label: 'Flying', enabled: false },
        p: { label: 'Preening', enabled: false }
      },
      label: 'Behaviors'
    },
    bre: {
      filters: {
        cdc: { label: 'Courtship, Display, or Copulation', enabled: false },
        fy: { label: 'Feeding Young', enabled: false },
        cf: { label: 'Carrying Food', enabled: false },
        cfs: { label: 'Carrying Fecal Sac', enabled: false },
        nb: { label: 'Nest Building', enabled: false }
      },
      label: 'Breeding'
    },
    behaviors: {
      filters: {
        s: { label: 'Song', enabled: false },
        c: { label: 'Call', enabled: false },
        nv: { label: 'Non-vocal', enabled: false },
        ds: { label: 'Dawn Song', enabled: false },
        fs: { label: 'Flight Song', enabled: false },
        fc: { label: 'Flight Call', enabled: false },
        dt: { label: 'Duet', enabled: false }
      },
      label: 'Sounds'
    },
    tag: {
      filters: {
        dt: { label: 'Duet', enabled: false },
        env: { label: 'Environmental', enabled: false },
        peo: { label: 'People', enabled: false },
        mul: { label: 'Multiple species', enabled: false },
        in: { label: 'In-hand', enabled: false },
        nes: { label: 'Nest', enabled: false },
        egg: { label: 'Egg(s)', enabled: false },
        hab: { label: 'Habitat', enabled: false },
        wat: { label: 'Watermark', enabled: false },
        bac: { label: 'Back of camera', enabled: false },
        dea: { label: 'Dead', enabled: false },
        fie: { label: 'Field notes/sketch', enabled: false },
        non: { label: 'No bird', enabled: false }
      },
      label: 'Photo tags'
    },
    includeUnconfirmed: {
      filters: {
        T: { label: 'Show Unconfirmed', enabled: false },
        O: { label: 'Only Unconfirmed', enabled: false }
      },
      label: 'Status'
    }
  },
  orders: {
    Anseriformes: { families: ['Anatidae'] },
    Galliformes: { families: ['Odontophoridae', 'Phasianidae'] },
    Podicipediformes: { families: ['Podicipedidae'] },
    Columbiformes: { families: ['Columbidae'] },
    Cuculiformes: { families: ['Cuculidae'] },
    Caprimulgiformes: {
      families: ['Caprimulgidae', 'Apodidae', 'Trochilidae']
    },
    Gruiformes: { families: ['Rallidae', 'Gruidae'] },
    Charadriiformes: {
      families: [
        'Recurvirostridae',
        'Haematopodidae',
        'Charadriidae',
        'Scolopacidae',
        'Alcidae',
        'Laridae'
      ]
    },
    Gaviiformes: { families: ['Gaviidae'] },
    Procellariiformes: { families: ['Diomedeidae', 'Procellariidae'] },
    Ciconiiformes: { families: ['Ciconiidae'] },
    Suliformes: { families: ['Fregatidae', 'Anhingidae', 'Phalacrocoracidae'] },
    Pelecaniformes: {
      families: ['Pelecanidae', 'Ardeidae', 'Threskiornithidae']
    },
    Cathartiformes: { families: ['Cathartidae'] },
    Accipitriformes: { families: ['Pandionidae', 'Accipitridae'] },
    Strigiformes: { families: ['Tytonidae', 'Strigidae'] },
    Coraciiformes: { families: ['Alcedinidae'] },
    Piciformes: { families: ['Picidae'] },
    Falconiformes: { families: ['Falconidae'] },
    Passeriformes: {
      families: [
        'Tyrannidae',
        'Vireonidae',
        'Laniidae',
        'Corvidae',
        'Paridae',
        'Alaudidae',
        'Hirundinidae',
        'Regulidae',
        'Sittidae',
        'Certhiidae',
        'Polioptilidae',
        'Troglodytidae',
        'Cinclidae',
        'Sturnidae',
        'Mimidae',
        'Turdidae',
        'Bombycillidae',
        'Passeridae',
        'Fringillidae',
        'Calcariidae',
        'Passerellidae',
        'Icteridae',
        'Parulidae',
        'Cardinalidae'
      ]
    }
  },
  families: {
    Anatidae: {
      commonName: 'Ducks, Geese, and Waterfowl',
      species: [
        'bbwduc',
        'snogoo',
        'cangoo',
        'truswa',
        'wooduc',
        'norsho',
        'mallar3',
        'gnwtea',
        'canvas',
        'hoomer'
      ]
    },
    Odontophoridae: { commonName: 'New World Quail', species: ['norbob'] },
    Phasianidae: {
      commonName: 'Pheasants, Grouse, and Allies',
      species: ['rinphe', 'rufgro', 'wiltur']
    },
    Podicipedidae: { commonName: 'Grebes', species: ['pibgre', 'rengre'] },
    Columbidae: {
      commonName: 'Pigeons and Doves',
      species: ['rocpig', 'cogdov', 'moudov']
    },
    Cuculidae: { commonName: 'Cuckoos', species: ['greroa', 'bkbcuc'] },
    Caprimulgidae: {
      commonName: 'Nightjars and Allies',
      species: ['comnig', 'chwwid']
    },
    Apodidae: { commonName: 'Swifts', species: ['chiswi'] },
    Trochilidae: { commonName: 'Hummingbirds', species: ['rthhum'] },
    Rallidae: {
      commonName: 'Rails, Gallinules, and Coots',
      species: ['clarai11', 'sora', 'y00475', 'purgal2']
    },
    Gruidae: { commonName: 'Cranes', species: ['whocra'] },
    Recurvirostridae: {
      commonName: 'Stilts and Avocets',
      species: ['bknsti', 'ameavo']
    },
    Haematopodidae: { commonName: 'Oystercatchers', species: ['ameoys'] },
    Charadriidae: {
      commonName: 'Plovers and Lapwings',
      species: ['amgplo', 'killde']
    },
    Scolopacidae: {
      commonName: 'Sandpipers and Allies',
      species: ['rudtur', 'dunlin', 'amewoo', 'wilsni1', 'sposan']
    },
    Alcidae: {
      commonName: 'Auks, Murres, and Puffins',
      species: ['commur', 'tufpuf']
    },
    Laridae: {
      commonName: 'Gulls, Terns, and Skimmers',
      species: [
        'laugul',
        'ribgul',
        'hergul',
        'leater1',
        'caster1',
        'blkter',
        'blkski'
      ]
    },
    Gaviidae: { commonName: 'Loons', species: ['retloo', 'comloo'] },
    Diomedeidae: { commonName: 'Albatrosses', species: ['layalb'] },
    Procellariidae: {
      commonName: 'Shearwaters and Petrels',
      species: ['norful']
    },
    Ciconiidae: { commonName: 'Storks', species: ['woosto'] },
    Fregatidae: { commonName: 'Frigatebirds', species: ['magfri'] },
    Anhingidae: { commonName: 'Anhingas', species: ['anhing'] },
    Phalacrocoracidae: {
      commonName: 'Cormorants and Shags',
      species: ['doccor']
    },
    Pelecanidae: { commonName: 'Pelicans', species: ['amwpel'] },
    Ardeidae: {
      commonName: 'Herons, Egrets, and Bitterns',
      species: ['amebit', 'grbher3', 'snoegr', 'grnher', 'bcnher']
    },
    Threskiornithidae: {
      commonName: 'Ibises and Spoonbills',
      species: ['rosspo1']
    },
    Cathartidae: {
      commonName: 'New World Vultures',
      species: ['calcon', 'turvul']
    },
    Pandionidae: { commonName: 'Osprey', species: ['osprey'] },
    Accipitridae: {
      commonName: 'Hawks, Eagles, and Kites',
      species: ['goleag', 'norhar2', 'coohaw', 'baleag', 'rethaw']
    },
    Tytonidae: { commonName: 'Barn-Owls', species: ['brnowl'] },
    Strigidae: {
      commonName: 'Owls',
      species: ['screec1', 'grhowl', 'snoowl1', 'brdowl']
    },
    Alcedinidae: { commonName: 'Kingfishers', species: ['belkin1'] },
    Picidae: {
      commonName: 'Woodpeckers',
      species: ['yebsap', 'rehwoo', 'dowwoo', 'pilwoo', 'norfli']
    },
    Falconidae: {
      commonName: 'Falcons and Caracaras',
      species: ['crecar1', 'amekes', 'perfal']
    },
    Tyrannidae: {
      commonName: 'Tyrant Flycatchers',
      species: ['olsfly', 'easpho', 'verfly', 'grcfly', 'easkin', 'sctfly']
    },
    Vireonidae: {
      commonName: 'Vireos, Shrike-Babblers, and Erpornis',
      species: ['warvir', 'reevir1']
    },
    Laniidae: { commonName: 'Shrikes', species: ['logshr'] },
    Corvidae: {
      commonName: 'Crows, Jays, and Magpies',
      species: ['stejay', 'blujay', 'bkbmag1', 'amecro', 'comrav']
    },
    Paridae: {
      commonName: 'Tits, Chickadees, and Titmice',
      species: ['bkcchi', 'tuftit']
    },
    Alaudidae: { commonName: 'Larks', species: ['horlar'] },
    Hirundinidae: {
      commonName: 'Swallows',
      species: ['purmar', 'barswa', 'cliswa']
    },
    Regulidae: { commonName: 'Kinglets', species: ['gockin', 'ruckin'] },
    Sittidae: { commonName: 'Nuthatches', species: ['rebnut', 'whbnut'] },
    Certhiidae: { commonName: 'Treecreepers', species: ['brncre'] },
    Polioptilidae: { commonName: 'Gnatcatchers', species: ['buggna'] },
    Troglodytidae: {
      commonName: 'Wrens',
      species: ['marwre', 'carwre', 'cacwre']
    },
    Cinclidae: { commonName: 'Dippers', species: ['amedip'] },
    Sturnidae: { commonName: 'Starlings', species: ['eursta'] },
    Mimidae: {
      commonName: 'Mockingbirds and Thrashers',
      species: ['grycat', 'brnthr', 'normoc']
    },
    Turdidae: {
      commonName: 'Thrushes and Allies',
      species: ['easblu', 'woothr', 'amerob']
    },
    Bombycillidae: { commonName: 'Waxwings', species: ['cedwax'] },
    Passeridae: { commonName: 'Old World Sparrows', species: ['houspa'] },
    Fringillidae: {
      commonName: 'Finches, Euphonias, and Allies',
      species: ['evegro', 'houfin', 'redcro', 'pinsis', 'amegfi']
    },
    Calcariidae: {
      commonName: 'Longspurs and Snow Buntings',
      species: ['laplon', 'snobun']
    },
    Passerellidae: {
      commonName: 'New World Sparrows',
      species: [
        'chispa',
        'bkcspa',
        'larspa',
        'daejun',
        'whcspa',
        'harspa',
        'spotow'
      ]
    },
    Icteridae: {
      commonName: 'Troupials and Allies',
      species: [
        'yehbla',
        'boboli',
        'wesmea',
        'balori',
        'rewbla',
        'bnhcow',
        'comgra'
      ]
    },
    Parulidae: {
      commonName: 'New World Warblers',
      species: [
        'ovenbi1',
        'bawwar',
        'kenwar',
        'comyel',
        'amered',
        'magwar',
        'yelwar',
        'yerwar',
        'btnwar'
      ]
    },
    Cardinalidae: {
      commonName: 'Cardinals and Allies',
      species: ['scatan', 'norcar', 'indbun', 'paibun']
    }
  },
  species: {
    bbwduc: {
      commonName: 'Black-bellied Whistling-Duck',
      family: 'Anatidae',
      order: 'Anseriformes'
    },
    snogoo: {
      commonName: 'Snow Goose',
      family: 'Anatidae',
      order: 'Anseriformes'
    },
    cangoo: {
      commonName: 'Canada Goose',
      family: 'Anatidae',
      order: 'Anseriformes'
    },
    truswa: {
      commonName: 'Trumpeter Swan',
      family: 'Anatidae',
      order: 'Anseriformes'
    },
    wooduc: {
      commonName: 'Wood Duck',
      family: 'Anatidae',
      order: 'Anseriformes'
    },
    norsho: {
      commonName: 'Northern Shoveler',
      family: 'Anatidae',
      order: 'Anseriformes'
    },
    mallar3: {
      commonName: 'Mallard',
      family: 'Anatidae',
      order: 'Anseriformes'
    },
    gnwtea: {
      commonName: 'Green-winged Teal',
      family: 'Anatidae',
      order: 'Anseriformes'
    },
    canvas: {
      commonName: 'Canvasback',
      family: 'Anatidae',
      order: 'Anseriformes'
    },
    hoomer: {
      commonName: 'Hooded Merganser',
      family: 'Anatidae',
      order: 'Anseriformes'
    },
    norbob: {
      commonName: 'Northern Bobwhite',
      family: 'Odontophoridae',
      order: 'Galliformes'
    },
    rinphe: {
      commonName: 'Ring-necked Pheasant',
      family: 'Phasianidae',
      order: 'Galliformes'
    },
    rufgro: {
      commonName: 'Ruffed Grouse',
      family: 'Phasianidae',
      order: 'Galliformes'
    },
    wiltur: {
      commonName: 'Wild Turkey',
      family: 'Phasianidae',
      order: 'Galliformes'
    },
    pibgre: {
      commonName: 'Pied-billed Grebe',
      family: 'Podicipedidae',
      order: 'Podicipediformes'
    },
    rengre: {
      commonName: 'Red-necked Grebe',
      family: 'Podicipedidae',
      order: 'Podicipediformes'
    },
    rocpig: {
      commonName: 'Rock Pigeon',
      family: 'Columbidae',
      order: 'Columbiformes'
    },
    cogdov: {
      commonName: 'Common Ground Dove',
      family: 'Columbidae',
      order: 'Columbiformes'
    },
    moudov: {
      commonName: 'Mourning Dove',
      family: 'Columbidae',
      order: 'Columbiformes'
    },
    greroa: {
      commonName: 'Greater Roadrunner',
      family: 'Cuculidae',
      order: 'Cuculiformes'
    },
    bkbcuc: {
      commonName: 'Black-billed Cuckoo',
      family: 'Cuculidae',
      order: 'Cuculiformes'
    },
    comnig: {
      commonName: 'Common Nighthawk',
      family: 'Caprimulgidae',
      order: 'Caprimulgiformes'
    },
    chwwid: {
      commonName: "Chuck-will's-widow",
      family: 'Caprimulgidae',
      order: 'Caprimulgiformes'
    },
    chiswi: {
      commonName: 'Chimney Swift',
      family: 'Apodidae',
      order: 'Caprimulgiformes'
    },
    rthhum: {
      commonName: 'Ruby-throated Hummingbird',
      family: 'Trochilidae',
      order: 'Caprimulgiformes'
    },
    clarai11: {
      commonName: 'Clapper Rail',
      family: 'Rallidae',
      order: 'Gruiformes'
    },
    sora: { commonName: 'Sora', family: 'Rallidae', order: 'Gruiformes' },
    y00475: {
      commonName: 'American Coot',
      family: 'Rallidae',
      order: 'Gruiformes'
    },
    purgal2: {
      commonName: 'Purple Gallinule',
      family: 'Rallidae',
      order: 'Gruiformes'
    },
    whocra: {
      commonName: 'Whooping Crane',
      family: 'Gruidae',
      order: 'Gruiformes'
    },
    bknsti: {
      commonName: 'Black-necked Stilt',
      family: 'Recurvirostridae',
      order: 'Charadriiformes'
    },
    ameavo: {
      commonName: 'American Avocet',
      family: 'Recurvirostridae',
      order: 'Charadriiformes'
    },
    ameoys: {
      commonName: 'American Oystercatcher',
      family: 'Haematopodidae',
      order: 'Charadriiformes'
    },
    amgplo: {
      commonName: 'American Golden-Plover',
      family: 'Charadriidae',
      order: 'Charadriiformes'
    },
    killde: {
      commonName: 'Killdeer',
      family: 'Charadriidae',
      order: 'Charadriiformes'
    },
    rudtur: {
      commonName: 'Ruddy Turnstone',
      family: 'Scolopacidae',
      order: 'Charadriiformes'
    },
    dunlin: {
      commonName: 'Dunlin',
      family: 'Scolopacidae',
      order: 'Charadriiformes'
    },
    amewoo: {
      commonName: 'American Woodcock',
      family: 'Scolopacidae',
      order: 'Charadriiformes'
    },
    wilsni1: {
      commonName: "Wilson's Snipe",
      family: 'Scolopacidae',
      order: 'Charadriiformes'
    },
    sposan: {
      commonName: 'Spotted Sandpiper',
      family: 'Scolopacidae',
      order: 'Charadriiformes'
    },
    commur: {
      commonName: 'Common Murre',
      family: 'Alcidae',
      order: 'Charadriiformes'
    },
    tufpuf: {
      commonName: 'Tufted Puffin',
      family: 'Alcidae',
      order: 'Charadriiformes'
    },
    laugul: {
      commonName: 'Laughing Gull',
      family: 'Laridae',
      order: 'Charadriiformes'
    },
    ribgul: {
      commonName: 'Ring-billed Gull',
      family: 'Laridae',
      order: 'Charadriiformes'
    },
    hergul: {
      commonName: 'Herring Gull',
      family: 'Laridae',
      order: 'Charadriiformes'
    },
    leater1: {
      commonName: 'Least Tern',
      family: 'Laridae',
      order: 'Charadriiformes'
    },
    caster1: {
      commonName: 'Caspian Tern',
      family: 'Laridae',
      order: 'Charadriiformes'
    },
    blkter: {
      commonName: 'Black Tern',
      family: 'Laridae',
      order: 'Charadriiformes'
    },
    blkski: {
      commonName: 'Black Skimmer',
      family: 'Laridae',
      order: 'Charadriiformes'
    },
    retloo: {
      commonName: 'Red-throated Loon',
      family: 'Gaviidae',
      order: 'Gaviiformes'
    },
    comloo: {
      commonName: 'Common Loon',
      family: 'Gaviidae',
      order: 'Gaviiformes'
    },
    layalb: {
      commonName: 'Laysan Albatross',
      family: 'Diomedeidae',
      order: 'Procellariiformes'
    },
    norful: {
      commonName: 'Northern Fulmar',
      family: 'Procellariidae',
      order: 'Procellariiformes'
    },
    woosto: {
      commonName: 'Wood Stork',
      family: 'Ciconiidae',
      order: 'Ciconiiformes'
    },
    magfri: {
      commonName: 'Magnificent Frigatebird',
      family: 'Fregatidae',
      order: 'Suliformes'
    },
    anhing: {
      commonName: 'Anhinga',
      family: 'Anhingidae',
      order: 'Suliformes'
    },
    doccor: {
      commonName: 'Double-crested Cormorant',
      family: 'Phalacrocoracidae',
      order: 'Suliformes'
    },
    amwpel: {
      commonName: 'American White Pelican',
      family: 'Pelecanidae',
      order: 'Pelecaniformes'
    },
    amebit: {
      commonName: 'American Bittern',
      family: 'Ardeidae',
      order: 'Pelecaniformes'
    },
    grbher3: {
      commonName: 'Great Blue Heron',
      family: 'Ardeidae',
      order: 'Pelecaniformes'
    },
    snoegr: {
      commonName: 'Snowy Egret',
      family: 'Ardeidae',
      order: 'Pelecaniformes'
    },
    grnher: {
      commonName: 'Green Heron',
      family: 'Ardeidae',
      order: 'Pelecaniformes'
    },
    bcnher: {
      commonName: 'Black-crowned Night-Heron',
      family: 'Ardeidae',
      order: 'Pelecaniformes'
    },
    rosspo1: {
      commonName: 'Roseate Spoonbill',
      family: 'Threskiornithidae',
      order: 'Pelecaniformes'
    },
    calcon: {
      commonName: 'California Condor',
      family: 'Cathartidae',
      order: 'Cathartiformes'
    },
    turvul: {
      commonName: 'Turkey Vulture',
      family: 'Cathartidae',
      order: 'Cathartiformes'
    },
    osprey: {
      commonName: 'Osprey',
      family: 'Pandionidae',
      order: 'Accipitriformes'
    },
    goleag: {
      commonName: 'Golden Eagle',
      family: 'Accipitridae',
      order: 'Accipitriformes'
    },
    norhar2: {
      commonName: 'Northern Harrier',
      family: 'Accipitridae',
      order: 'Accipitriformes'
    },
    coohaw: {
      commonName: "Cooper's Hawk",
      family: 'Accipitridae',
      order: 'Accipitriformes'
    },
    baleag: {
      commonName: 'Bald Eagle',
      family: 'Accipitridae',
      order: 'Accipitriformes'
    },
    rethaw: {
      commonName: 'Red-tailed Hawk',
      family: 'Accipitridae',
      order: 'Accipitriformes'
    },
    brnowl: {
      commonName: 'Barn Owl',
      family: 'Tytonidae',
      order: 'Strigiformes'
    },
    screec1: {
      commonName: 'screech-owl sp.',
      family: 'Strigidae',
      order: 'Strigiformes'
    },
    grhowl: {
      commonName: 'Great Horned Owl',
      family: 'Strigidae',
      order: 'Strigiformes'
    },
    snoowl1: {
      commonName: 'Snowy Owl',
      family: 'Strigidae',
      order: 'Strigiformes'
    },
    brdowl: {
      commonName: 'Barred Owl',
      family: 'Strigidae',
      order: 'Strigiformes'
    },
    belkin1: {
      commonName: 'Belted Kingfisher',
      family: 'Alcedinidae',
      order: 'Coraciiformes'
    },
    yebsap: {
      commonName: 'Yellow-bellied Sapsucker',
      family: 'Picidae',
      order: 'Piciformes'
    },
    rehwoo: {
      commonName: 'Red-headed Woodpecker',
      family: 'Picidae',
      order: 'Piciformes'
    },
    dowwoo: {
      commonName: 'Downy Woodpecker',
      family: 'Picidae',
      order: 'Piciformes'
    },
    pilwoo: {
      commonName: 'Pileated Woodpecker',
      family: 'Picidae',
      order: 'Piciformes'
    },
    norfli: {
      commonName: 'Northern Flicker',
      family: 'Picidae',
      order: 'Piciformes'
    },
    crecar1: {
      commonName: 'Crested Caracara',
      family: 'Falconidae',
      order: 'Falconiformes'
    },
    amekes: {
      commonName: 'American Kestrel',
      family: 'Falconidae',
      order: 'Falconiformes'
    },
    perfal: {
      commonName: 'Peregrine Falcon',
      family: 'Falconidae',
      order: 'Falconiformes'
    },
    olsfly: {
      commonName: 'Olive-sided Flycatcher',
      family: 'Tyrannidae',
      order: 'Passeriformes'
    },
    easpho: {
      commonName: 'Eastern Phoebe',
      family: 'Tyrannidae',
      order: 'Passeriformes'
    },
    verfly: {
      commonName: 'Vermilion Flycatcher',
      family: 'Tyrannidae',
      order: 'Passeriformes'
    },
    grcfly: {
      commonName: 'Great Crested Flycatcher',
      family: 'Tyrannidae',
      order: 'Passeriformes'
    },
    easkin: {
      commonName: 'Eastern Kingbird',
      family: 'Tyrannidae',
      order: 'Passeriformes'
    },
    sctfly: {
      commonName: 'Scissor-tailed Flycatcher',
      family: 'Tyrannidae',
      order: 'Passeriformes'
    },
    warvir: {
      commonName: 'Warbling Vireo',
      family: 'Vireonidae',
      order: 'Passeriformes'
    },
    reevir1: {
      commonName: 'Red-eyed Vireo',
      family: 'Vireonidae',
      order: 'Passeriformes'
    },
    logshr: {
      commonName: 'Loggerhead Shrike',
      family: 'Laniidae',
      order: 'Passeriformes'
    },
    stejay: {
      commonName: "Steller's Jay",
      family: 'Corvidae',
      order: 'Passeriformes'
    },
    blujay: {
      commonName: 'Blue Jay',
      family: 'Corvidae',
      order: 'Passeriformes'
    },
    bkbmag1: {
      commonName: 'Black-billed Magpie',
      family: 'Corvidae',
      order: 'Passeriformes'
    },
    amecro: {
      commonName: 'American Crow',
      family: 'Corvidae',
      order: 'Passeriformes'
    },
    comrav: {
      commonName: 'Common Raven',
      family: 'Corvidae',
      order: 'Passeriformes'
    },
    bkcchi: {
      commonName: 'Black-capped Chickadee',
      family: 'Paridae',
      order: 'Passeriformes'
    },
    tuftit: {
      commonName: 'Tufted Titmouse',
      family: 'Paridae',
      order: 'Passeriformes'
    },
    horlar: {
      commonName: 'Horned Lark',
      family: 'Alaudidae',
      order: 'Passeriformes'
    },
    purmar: {
      commonName: 'Purple Martin',
      family: 'Hirundinidae',
      order: 'Passeriformes'
    },
    barswa: {
      commonName: 'Barn Swallow',
      family: 'Hirundinidae',
      order: 'Passeriformes'
    },
    cliswa: {
      commonName: 'Cliff Swallow',
      family: 'Hirundinidae',
      order: 'Passeriformes'
    },
    gockin: {
      commonName: 'Golden-crowned Kinglet',
      family: 'Regulidae',
      order: 'Passeriformes'
    },
    ruckin: {
      commonName: 'Ruby-crowned Kinglet',
      family: 'Regulidae',
      order: 'Passeriformes'
    },
    rebnut: {
      commonName: 'Red-breasted Nuthatch',
      family: 'Sittidae',
      order: 'Passeriformes'
    },
    whbnut: {
      commonName: 'White-breasted Nuthatch',
      family: 'Sittidae',
      order: 'Passeriformes'
    },
    brncre: {
      commonName: 'Brown Creeper',
      family: 'Certhiidae',
      order: 'Passeriformes'
    },
    buggna: {
      commonName: 'Blue-gray Gnatcatcher',
      family: 'Polioptilidae',
      order: 'Passeriformes'
    },
    marwre: {
      commonName: 'Marsh Wren',
      family: 'Troglodytidae',
      order: 'Passeriformes'
    },
    carwre: {
      commonName: 'Carolina Wren',
      family: 'Troglodytidae',
      order: 'Passeriformes'
    },
    cacwre: {
      commonName: 'Cactus Wren',
      family: 'Troglodytidae',
      order: 'Passeriformes'
    },
    amedip: {
      commonName: 'American Dipper',
      family: 'Cinclidae',
      order: 'Passeriformes'
    },
    eursta: {
      commonName: 'European Starling',
      family: 'Sturnidae',
      order: 'Passeriformes'
    },
    grycat: {
      commonName: 'Gray Catbird',
      family: 'Mimidae',
      order: 'Passeriformes'
    },
    brnthr: {
      commonName: 'Brown Thrasher',
      family: 'Mimidae',
      order: 'Passeriformes'
    },
    normoc: {
      commonName: 'Northern Mockingbird',
      family: 'Mimidae',
      order: 'Passeriformes'
    },
    easblu: {
      commonName: 'Eastern Bluebird',
      family: 'Turdidae',
      order: 'Passeriformes'
    },
    woothr: {
      commonName: 'Wood Thrush',
      family: 'Turdidae',
      order: 'Passeriformes'
    },
    amerob: {
      commonName: 'American Robin',
      family: 'Turdidae',
      order: 'Passeriformes'
    },
    cedwax: {
      commonName: 'Cedar Waxwing',
      family: 'Bombycillidae',
      order: 'Passeriformes'
    },
    houspa: {
      commonName: 'House Sparrow',
      family: 'Passeridae',
      order: 'Passeriformes'
    },
    evegro: {
      commonName: 'Evening Grosbeak',
      family: 'Fringillidae',
      order: 'Passeriformes'
    },
    houfin: {
      commonName: 'House Finch',
      family: 'Fringillidae',
      order: 'Passeriformes'
    },
    redcro: {
      commonName: 'Red Crossbill',
      family: 'Fringillidae',
      order: 'Passeriformes'
    },
    pinsis: {
      commonName: 'Pine Siskin',
      family: 'Fringillidae',
      order: 'Passeriformes'
    },
    amegfi: {
      commonName: 'American Goldfinch',
      family: 'Fringillidae',
      order: 'Passeriformes'
    },
    laplon: {
      commonName: 'Lapland Longspur',
      family: 'Calcariidae',
      order: 'Passeriformes'
    },
    snobun: {
      commonName: 'Snow Bunting',
      family: 'Calcariidae',
      order: 'Passeriformes'
    },
    chispa: {
      commonName: 'Chipping Sparrow',
      family: 'Passerellidae',
      order: 'Passeriformes'
    },
    bkcspa: {
      commonName: 'Black-chinned Sparrow',
      family: 'Passerellidae',
      order: 'Passeriformes'
    },
    larspa: {
      commonName: 'Lark Sparrow',
      family: 'Passerellidae',
      order: 'Passeriformes'
    },
    daejun: {
      commonName: 'Dark-eyed Junco',
      family: 'Passerellidae',
      order: 'Passeriformes'
    },
    whcspa: {
      commonName: 'White-crowned Sparrow',
      family: 'Passerellidae',
      order: 'Passeriformes'
    },
    harspa: {
      commonName: "Harris's Sparrow",
      family: 'Passerellidae',
      order: 'Passeriformes'
    },
    spotow: {
      commonName: 'Spotted Towhee',
      family: 'Passerellidae',
      order: 'Passeriformes'
    },
    yehbla: {
      commonName: 'Yellow-headed Blackbird',
      family: 'Icteridae',
      order: 'Passeriformes'
    },
    boboli: {
      commonName: 'Bobolink',
      family: 'Icteridae',
      order: 'Passeriformes'
    },
    wesmea: {
      commonName: 'Western Meadowlark',
      family: 'Icteridae',
      order: 'Passeriformes'
    },
    balori: {
      commonName: 'Baltimore Oriole',
      family: 'Icteridae',
      order: 'Passeriformes'
    },
    rewbla: {
      commonName: 'Red-winged Blackbird',
      family: 'Icteridae',
      order: 'Passeriformes'
    },
    bnhcow: {
      commonName: 'Brown-headed Cowbird',
      family: 'Icteridae',
      order: 'Passeriformes'
    },
    comgra: {
      commonName: 'Common Grackle',
      family: 'Icteridae',
      order: 'Passeriformes'
    },
    ovenbi1: {
      commonName: 'Ovenbird',
      family: 'Parulidae',
      order: 'Passeriformes'
    },
    bawwar: {
      commonName: 'Black-and-white Warbler',
      family: 'Parulidae',
      order: 'Passeriformes'
    },
    kenwar: {
      commonName: 'Kentucky Warbler',
      family: 'Parulidae',
      order: 'Passeriformes'
    },
    comyel: {
      commonName: 'Common Yellowthroat',
      family: 'Parulidae',
      order: 'Passeriformes'
    },
    amered: {
      commonName: 'American Redstart',
      family: 'Parulidae',
      order: 'Passeriformes'
    },
    magwar: {
      commonName: 'Magnolia Warbler',
      family: 'Parulidae',
      order: 'Passeriformes'
    },
    yelwar: {
      commonName: 'Yellow Warbler',
      family: 'Parulidae',
      order: 'Passeriformes'
    },
    yerwar: {
      commonName: 'Yellow-rumped Warbler',
      family: 'Parulidae',
      order: 'Passeriformes'
    },
    btnwar: {
      commonName: 'Black-throated Green Warbler',
      family: 'Parulidae',
      order: 'Passeriformes'
    },
    scatan: {
      commonName: 'Scarlet Tanager',
      family: 'Cardinalidae',
      order: 'Passeriformes'
    },
    norcar: {
      commonName: 'Northern Cardinal',
      family: 'Cardinalidae',
      order: 'Passeriformes'
    },
    indbun: {
      commonName: 'Indigo Bunting',
      family: 'Cardinalidae',
      order: 'Passeriformes'
    },
    paibun: {
      commonName: 'Painted Bunting',
      family: 'Cardinalidae',
      order: 'Passeriformes'
    }
  }
})

export const mutations = {
  setFilter (state, { groupId, filterId, value }) {
    state.filterGroups[groupId].filters[filterId].enabled = value
  },
  setFilterGroups (state, filterGroups) {
    state.filterGroups = filterGroups
  },
  setSpecies (state, { code, enabled }) {
    Vue.set(state.species[code], 'enabled', enabled)
  }
}

export const getters = {
  allFilters (state) {
    return mapValues(state.filterGroups, fg => Object.keys(pickBy(fg.filters, f => f.enabled)))
  },
  enabledSpecies (state, getters) {
    return Object.keys(pickBy(state.species, s => s.enabled))
  },
  familyEnabled (state) {
    return mapValues(state.families, f => every(f.species, s => state.species[s].enabled))
  },
  orderEnabled (state, getters) {
    return mapValues(state.orders, o => every(o.families, f => getters.familyEnabled[f]))
  },
  allEnabled (state, getters) {
    return getters.enabledSpecies.length === Object.keys(state.species).length
  }
}

export const actions = {
  setFamily ({ commit, state }, { family, enabled }) {
    for (const species of state.families[family].species) {
      commit('setSpecies', { code: species, enabled })
    }
  },
  setOrder ({ commit, dispatch, state }, { order, enabled }) {
    for (const family of state.orders[order].families) {
      dispatch('setFamily', { family, enabled })
    }
  },
  setAll ({ commit, dispatch, state }, enabled) {
    for (const species of Object.keys(state.species)) {
      commit('setSpecies', { code: species, enabled })
    }
  }
}
