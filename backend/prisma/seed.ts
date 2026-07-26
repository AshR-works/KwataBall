/* 

import { PrismaClient, Position } from '../generated/prisma';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const teams = [
  { name: 'École de Basket de Douala', shortName: 'EB DLA', city: 'Douala' },
  { name: 'FAP de Yaoundé', shortName: 'FAP', city: 'Yaoundé' },
  { name: 'Falcons de Yaoundé', shortName: 'FALCONS', city: 'Yaoundé' },
  { name: 'Douala Firebirds', shortName: 'FIREBIRDS', city: 'Douala' },
  { name: 'BEAC de Yaoundé', shortName: 'BEAC', city: 'Yaoundé' },
  { name: 'ALP de Yaoundé', shortName: 'ALP', city: 'Yaoundé' },
  { name: 'Moungo Zone de Nkongsamba', shortName: 'MOUNGO', city: 'Nkongsamba' },
  { name: 'ACPBA de Yaoundé', shortName: 'ACPBA', city: 'Yaoundé' },
];

const firstNames = [
  'Jean', 'Paul', 'Emmanuel', 'Christian', 'Yves', 'Franck', 'Steve', 'Arnaud',
  'Boris', 'Cedric', 'Herve', 'Patrick', 'Sylvain', 'Aurelien', 'Landry', 'Rodrigue',
  'Serge', 'Junior', 'Michel', 'Bertrand', 'Alain', 'Blaise', 'Thierry', 'Vincent',
];

const lastNames = [
  'Mballa', 'Ateba', 'Nguepy', 'Bileg', 'Fozeu', 'Kadji', 'Bogmis', 'Djampou',
  'Pemboura', 'Dhalil', 'Etoundi', 'Ondoa', 'Mvondo', 'Essomba', 'Ngo Bell',
  'Tchamba', 'Fokou', 'Ngassa', 'Talla', 'Kamdem', 'Onana', 'Biya', 'Nkeng', 'Moukoko',
];

// Répartition réaliste sur un effectif de 12 : 2 PG, 2 SG, 3 SF, 3 PF, 2 C
const positionDistribution: Position[] = [
  Position.POINT_GUARD, Position.POINT_GUARD,
  Position.SHOOTING_GUARD, Position.SHOOTING_GUARD,
  Position.SMALL_FORWARD, Position.SMALL_FORWARD, Position.SMALL_FORWARD,
  Position.POWER_FORWARD, Position.POWER_FORWARD, Position.POWER_FORWARD,
  Position.CENTER, Position.CENTER,
];

const heightByPosition: Record<Position, [number, number]> = {
  POINT_GUARD: [178, 188],
  SHOOTING_GUARD: [185, 195],
  SMALL_FORWARD: [193, 201],
  POWER_FORWARD: [198, 206],
  CENTER: [203, 213],
};

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDateOfBirth() {
  // Joueurs seniors entre 18 et 34 ans
  const age = randomInt(18, 34);
  const year = 2026 - age;
  const month = randomInt(1, 12);
  const day = randomInt(1, 28);
  return new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
}

function generatePlayers(teamIndex: number) {
  const usedNames = new Set<string>();
  const players = [];

  for (let i = 0; i < 12; i++) {
    let firstName: string;
    let lastName: string;
    let key: string;

    do {
      firstName = firstNames[randomInt(0, firstNames.length - 1)];
      lastName = lastNames[randomInt(0, lastNames.length - 1)];
      key = `${firstName}-${lastName}`;
    } while (usedNames.has(key));
    usedNames.add(key);

    const position = positionDistribution[i];
    const [minH, maxH] = heightByPosition[position];

    players.push({
      firstName,
      lastName,
      position,
      jerseyNumber: i + 4, // numéros de 4 à 15, évite les 0-3 souvent réservés
      nationality: 'Camerounaise',
      dateOfBirth: randomDateOfBirth(),
      height: randomInt(minH, maxH),
      weight: randomInt(75, 105),
      photoUrl: null,
      isActive: true,
    });
  }

  return players;
}

async function main() {
  console.log('Nettoyage des données existantes...');
  await prisma.match.deleteMany();
  await prisma.player.deleteMany();
  await prisma.team.deleteMany();

  console.log('Création des équipes...');
  const createdTeams = [];
  for (const team of teams) {
    const created = await prisma.team.create({ data: team });
    createdTeams.push(created);
    console.log(`  ✓ ${created.name}`);
  }

  console.log('Création des joueurs (12 par équipe)...');
  for (let i = 0; i < createdTeams.length; i++) {
    const team = createdTeams[i];
    const players = generatePlayers(i);

    for (const player of players) {
      await prisma.player.create({
        data: { ...player, teamId: team.id },
      });
    }
    console.log(`  ✓ ${players.length} joueurs pour ${team.name}`);
  }

  // Compte total
  const totalPlayers = await prisma.player.count();
  const totalTeams = await prisma.team.count();
  console.log(`\nTerminé : ${totalTeams} équipes, ${totalPlayers} joueurs créés.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

*/
//Peuplement de toutes les équipes et de tous les joueurs pour le championnat 2026

import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});

const prisma = new PrismaClient({ adapter });
async function main() {
  console.log('🌱 Début du seed des joueurs...');

  const players = [
    // Ecole de Basket Douala
    { firstName: 'Junior', lastName: 'Ekwalla', position: 'POINT_GUARD', jerseyNumber: 4, nationality: 'Camerounaise', dateOfBirth: new Date('2001-03-12'), height: 180, weight: 75, teamId: 'eb0284b0-99ab-4ec2-9336-55f993250e07' },
    { firstName: 'Steve', lastName: 'Mbarga', position: 'POINT_GUARD', jerseyNumber: 7, nationality: 'Camerounaise', dateOfBirth: new Date('1999-07-22'), height: 183, weight: 78, teamId: 'eb0284b0-99ab-4ec2-9336-55f993250e07' },
    { firstName: 'Alain', lastName: 'Ngo Bell', position: 'SHOOTING_GUARD', jerseyNumber: 9, nationality: 'Camerounaise', dateOfBirth: new Date('2000-11-05'), height: 188, weight: 82, teamId: 'eb0284b0-99ab-4ec2-9336-55f993250e07' },
    { firstName: 'Yves', lastName: 'Owona', position: 'SHOOTING_GUARD', jerseyNumber: 11, nationality: 'Camerounaise', dateOfBirth: new Date('1998-02-18'), height: 190, weight: 85, teamId: 'eb0284b0-99ab-4ec2-9336-55f993250e07' },
    { firstName: 'Bertrand', lastName: 'Fouda', position: 'SMALL_FORWARD', jerseyNumber: 14, nationality: 'Camerounaise', dateOfBirth: new Date('2002-05-30'), height: 195, weight: 88, teamId: 'eb0284b0-99ab-4ec2-9336-55f993250e07' },
    { firstName: 'Landry', lastName: 'Essomba', position: 'SMALL_FORWARD', jerseyNumber: 15, nationality: 'Camerounaise', dateOfBirth: new Date('1997-09-14'), height: 197, weight: 90, teamId: 'eb0284b0-99ab-4ec2-9336-55f993250e07' },
    { firstName: 'Herve', lastName: 'Nkoulou', position: 'SMALL_FORWARD', jerseyNumber: 21, nationality: 'Camerounaise', dateOfBirth: new Date('2003-01-08'), height: 193, weight: 86, teamId: 'eb0284b0-99ab-4ec2-9336-55f993250e07' },
    { firstName: 'Rodrigue', lastName: 'Meka', position: 'POWER_FORWARD', jerseyNumber: 23, nationality: 'Camerounaise', dateOfBirth: new Date('1996-06-25'), height: 202, weight: 98, teamId: 'eb0284b0-99ab-4ec2-9336-55f993250e07' },
    { firstName: 'Serge', lastName: 'Abanda', position: 'POWER_FORWARD', jerseyNumber: 25, nationality: 'Camerounaise', dateOfBirth: new Date('2000-08-19'), height: 204, weight: 100, teamId: 'eb0284b0-99ab-4ec2-9336-55f993250e07' },
    { firstName: 'Patrick', lastName: 'Zambo', position: 'POWER_FORWARD', jerseyNumber: 32, nationality: 'Camerounaise', dateOfBirth: new Date('1999-04-03'), height: 206, weight: 102, teamId: 'eb0284b0-99ab-4ec2-9336-55f993250e07' },
    { firstName: 'Christian', lastName: 'Same', position: 'CENTER', jerseyNumber: 41, nationality: 'Camerounaise', dateOfBirth: new Date('1995-12-11'), height: 210, weight: 108, teamId: 'eb0284b0-99ab-4ec2-9336-55f993250e07' },
    { firstName: 'Fabrice', lastName: 'Mvondo', position: 'CENTER', jerseyNumber: 44, nationality: 'Camerounaise', dateOfBirth: new Date('1998-10-27'), height: 208, weight: 105, teamId: 'eb0284b0-99ab-4ec2-9336-55f993250e07' },

    // FAP de Yaoundé
    { firstName: 'Emmanuel', lastName: 'Biya', position: 'POINT_GUARD', jerseyNumber: 3, nationality: 'Camerounaise', dateOfBirth: new Date('2000-02-14'), height: 179, weight: 74, teamId: 'ded42cb3-e916-42a2-b143-6364cd0b3ba4' },
    { firstName: 'Arnaud', lastName: 'Tsafack', position: 'POINT_GUARD', jerseyNumber: 5, nationality: 'Camerounaise', dateOfBirth: new Date('2001-06-09'), height: 182, weight: 76, teamId: 'ded42cb3-e916-42a2-b143-6364cd0b3ba4' },
    { firstName: 'Michel', lastName: 'Onana', position: 'SHOOTING_GUARD', jerseyNumber: 8, nationality: 'Camerounaise', dateOfBirth: new Date('1999-09-21'), height: 187, weight: 80, teamId: 'ded42cb3-e916-42a2-b143-6364cd0b3ba4' },
    { firstName: 'Franck', lastName: 'Mengue', position: 'SHOOTING_GUARD', jerseyNumber: 10, nationality: 'Camerounaise', dateOfBirth: new Date('1997-12-02'), height: 191, weight: 84, teamId: 'ded42cb3-e916-42a2-b143-6364cd0b3ba4' },
    { firstName: 'Cedric', lastName: 'Assiga', position: 'SMALL_FORWARD', jerseyNumber: 13, nationality: 'Camerounaise', dateOfBirth: new Date('2002-03-17'), height: 196, weight: 87, teamId: 'ded42cb3-e916-42a2-b143-6364cd0b3ba4' },
    { firstName: 'Boris', lastName: 'Ndoumbe', position: 'SMALL_FORWARD', jerseyNumber: 16, nationality: 'Camerounaise', dateOfBirth: new Date('1998-07-30'), height: 194, weight: 85, teamId: 'ded42cb3-e916-42a2-b143-6364cd0b3ba4' },
    { firstName: 'Aristide', lastName: 'Kamdem', position: 'SMALL_FORWARD', jerseyNumber: 19, nationality: 'Camerounaise', dateOfBirth: new Date('2003-04-25'), height: 192, weight: 83, teamId: 'ded42cb3-e916-42a2-b143-6364cd0b3ba4' },
    { firstName: 'Guy', lastName: 'Fotso', position: 'POWER_FORWARD', jerseyNumber: 24, nationality: 'Camerounaise', dateOfBirth: new Date('1996-11-13'), height: 203, weight: 99, teamId: 'ded42cb3-e916-42a2-b143-6364cd0b3ba4' },
    { firstName: 'Marcel', lastName: 'Djoumessi', position: 'POWER_FORWARD', jerseyNumber: 27, nationality: 'Camerounaise', dateOfBirth: new Date('2000-01-06'), height: 205, weight: 101, teamId: 'ded42cb3-e916-42a2-b143-6364cd0b3ba4' },
    { firstName: 'Blaise', lastName: 'Tchoua', position: 'POWER_FORWARD', jerseyNumber: 33, nationality: 'Camerounaise', dateOfBirth: new Date('1999-05-28'), height: 207, weight: 103, teamId: 'ded42cb3-e916-42a2-b143-6364cd0b3ba4' },
    { firstName: 'Ibrahim', lastName: 'Souley', position: 'CENTER', jerseyNumber: 42, nationality: 'Camerounaise', dateOfBirth: new Date('1994-08-16'), height: 211, weight: 110, teamId: 'ded42cb3-e916-42a2-b143-6364cd0b3ba4' },
    { firstName: 'David', lastName: 'Ateba', position: 'CENTER', jerseyNumber: 45, nationality: 'Camerounaise', dateOfBirth: new Date('1997-02-24'), height: 209, weight: 106, teamId: 'ded42cb3-e916-42a2-b143-6364cd0b3ba4' },

    // Falcons de Yaoundé
    { firstName: 'Olivier', lastName: 'Mendo', position: 'POINT_GUARD', jerseyNumber: 2, nationality: 'Camerounaise', dateOfBirth: new Date('2001-10-19'), height: 178, weight: 73, teamId: 'ec4b60cb-55dc-400d-a2a7-f0a345e896cf' },
    { firstName: 'Thierry', lastName: 'Ngangue', position: 'POINT_GUARD', jerseyNumber: 6, nationality: 'Camerounaise', dateOfBirth: new Date('1999-01-27'), height: 181, weight: 75, teamId: 'ec4b60cb-55dc-400d-a2a7-f0a345e896cf' },
    { firstName: 'Vincent', lastName: 'Belinga', position: 'SHOOTING_GUARD', jerseyNumber: 9, nationality: 'Camerounaise', dateOfBirth: new Date('2000-04-11'), height: 189, weight: 81, teamId: 'ec4b60cb-55dc-400d-a2a7-f0a345e896cf' },
    { firstName: 'Hugues', lastName: 'Ondoa', position: 'SHOOTING_GUARD', jerseyNumber: 12, nationality: 'Camerounaise', dateOfBirth: new Date('1998-08-08'), height: 186, weight: 79, teamId: 'ec4b60cb-55dc-400d-a2a7-f0a345e896cf' },
    { firstName: 'Nathan', lastName: 'Etoundi', position: 'SMALL_FORWARD', jerseyNumber: 15, nationality: 'Camerounaise', dateOfBirth: new Date('2002-12-20'), height: 195, weight: 86, teamId: 'ec4b60cb-55dc-400d-a2a7-f0a345e896cf' },
    { firstName: 'Wilfried', lastName: 'Bilong', position: 'SMALL_FORWARD', jerseyNumber: 17, nationality: 'Camerounaise', dateOfBirth: new Date('1997-03-05'), height: 193, weight: 84, teamId: 'ec4b60cb-55dc-400d-a2a7-f0a345e896cf' },
    { firstName: 'Armand', lastName: 'Nnomo', position: 'SMALL_FORWARD', jerseyNumber: 20, nationality: 'Camerounaise', dateOfBirth: new Date('2003-06-13'), height: 191, weight: 82, teamId: 'ec4b60cb-55dc-400d-a2a7-f0a345e896cf' },
    { firstName: 'Rostand', lastName: 'Kenmogne', position: 'POWER_FORWARD', jerseyNumber: 22, nationality: 'Camerounaise', dateOfBirth: new Date('1996-09-01'), height: 204, weight: 100, teamId: 'ec4b60cb-55dc-400d-a2a7-f0a345e896cf' },
    { firstName: 'Dieudonne', lastName: 'Ambassa', position: 'POWER_FORWARD', jerseyNumber: 26, nationality: 'Camerounaise', dateOfBirth: new Date('2000-02-09'), height: 206, weight: 102, teamId: 'ec4b60cb-55dc-400d-a2a7-f0a345e896cf' },
    { firstName: 'Merlin', lastName: 'Nga', position: 'POWER_FORWARD', jerseyNumber: 31, nationality: 'Camerounaise', dateOfBirth: new Date('1999-07-17'), height: 205, weight: 101, teamId: 'ec4b60cb-55dc-400d-a2a7-f0a345e896cf' },
    { firstName: 'Jacques', lastName: 'Ela', position: 'CENTER', jerseyNumber: 40, nationality: 'Camerounaise', dateOfBirth: new Date('1995-05-22'), height: 212, weight: 111, teamId: 'ec4b60cb-55dc-400d-a2a7-f0a345e896cf' },
    { firstName: 'Innocent', lastName: 'Bidias', position: 'CENTER', jerseyNumber: 43, nationality: 'Camerounaise', dateOfBirth: new Date('1998-11-30'), height: 208, weight: 107, teamId: 'ec4b60cb-55dc-400d-a2a7-f0a345e896cf' },

    // Douala Firebirds
    { firstName: 'Kevin', lastName: 'Njoya', position: 'POINT_GUARD', jerseyNumber: 1, nationality: 'Camerounaise', dateOfBirth: new Date('2001-01-15'), height: 179, weight: 74, teamId: '8d332b1b-9b82-471f-b255-dfc5ab886a0e' },
    { firstName: 'Aristide', lastName: 'Manga', position: 'POINT_GUARD', jerseyNumber: 4, nationality: 'Camerounaise', dateOfBirth: new Date('1999-05-02'), height: 182, weight: 77, teamId: '8d332b1b-9b82-471f-b255-dfc5ab886a0e' },
    { firstName: 'Samuel', lastName: 'Ekani', position: 'SHOOTING_GUARD', jerseyNumber: 7, nationality: 'Camerounaise', dateOfBirth: new Date('2000-08-24'), height: 188, weight: 80, teamId: '8d332b1b-9b82-471f-b255-dfc5ab886a0e' },
    { firstName: 'Rene', lastName: 'Ndifor', position: 'SHOOTING_GUARD', jerseyNumber: 11, nationality: 'Camerounaise', dateOfBirth: new Date('1997-10-06'), height: 190, weight: 83, teamId: '8d332b1b-9b82-471f-b255-dfc5ab886a0e' },
    { firstName: 'Georges', lastName: 'Talla', position: 'SMALL_FORWARD', jerseyNumber: 14, nationality: 'Camerounaise', dateOfBirth: new Date('2002-02-28'), height: 194, weight: 85, teamId: '8d332b1b-9b82-471f-b255-dfc5ab886a0e' },
    { firstName: 'Ferdinand', lastName: 'Baleng', position: 'SMALL_FORWARD', jerseyNumber: 18, nationality: 'Camerounaise', dateOfBirth: new Date('1998-04-19'), height: 196, weight: 87, teamId: '8d332b1b-9b82-471f-b255-dfc5ab886a0e' },
    { firstName: 'Loic', lastName: 'Same', position: 'SMALL_FORWARD', jerseyNumber: 21, nationality: 'Camerounaise', dateOfBirth: new Date('2003-09-07'), height: 192, weight: 83, teamId: '8d332b1b-9b82-471f-b255-dfc5ab886a0e' },
    { firstName: 'Aime', lastName: 'Ngo Nlend', position: 'POWER_FORWARD', jerseyNumber: 23, nationality: 'Camerounaise', dateOfBirth: new Date('1996-12-24'), height: 203, weight: 99, teamId: '8d332b1b-9b82-471f-b255-dfc5ab886a0e' },
    { firstName: 'Sylvestre', lastName: 'Kotto', position: 'POWER_FORWARD', jerseyNumber: 28, nationality: 'Camerounaise', dateOfBirth: new Date('2000-06-11'), height: 205, weight: 101, teamId: '8d332b1b-9b82-471f-b255-dfc5ab886a0e' },
    { firstName: 'Brice', lastName: 'Nyada', position: 'POWER_FORWARD', jerseyNumber: 34, nationality: 'Camerounaise', dateOfBirth: new Date('1999-03-29'), height: 204, weight: 98, teamId: '8d332b1b-9b82-471f-b255-dfc5ab886a0e' },
    { firstName: 'Antoine', lastName: 'Mbida', position: 'CENTER', jerseyNumber: 40, nationality: 'Camerounaise', dateOfBirth: new Date('1994-07-14'), height: 213, weight: 112, teamId: '8d332b1b-9b82-471f-b255-dfc5ab886a0e' },
    { firstName: 'Prosper', lastName: 'Angoula', position: 'CENTER', jerseyNumber: 46, nationality: 'Camerounaise', dateOfBirth: new Date('1997-01-03'), height: 209, weight: 107, teamId: '8d332b1b-9b82-471f-b255-dfc5ab886a0e' },

    // BEAC de Yaoundé
    { firstName: 'Paul', lastName: 'Mengolo', position: 'POINT_GUARD', jerseyNumber: 3, nationality: 'Camerounaise', dateOfBirth: new Date('2000-05-08'), height: 180, weight: 75, teamId: '70aa782e-18b1-43ac-8001-664a55a70b77' },
    { firstName: 'Eric', lastName: 'Sende', position: 'POINT_GUARD', jerseyNumber: 6, nationality: 'Camerounaise', dateOfBirth: new Date('1999-09-16'), height: 183, weight: 78, teamId: '70aa782e-18b1-43ac-8001-664a55a70b77' },
    { firstName: 'Nestor', lastName: 'Bella', position: 'SHOOTING_GUARD', jerseyNumber: 8, nationality: 'Camerounaise', dateOfBirth: new Date('2001-12-01'), height: 187, weight: 80, teamId: '70aa782e-18b1-43ac-8001-664a55a70b77' },
    { firstName: 'Serge', lastName: 'Feudjio', position: 'SHOOTING_GUARD', jerseyNumber: 10, nationality: 'Camerounaise', dateOfBirth: new Date('1998-03-23'), height: 189, weight: 82, teamId: '70aa782e-18b1-43ac-8001-664a55a70b77' },
    { firstName: 'Marius', lastName: 'Ngo Tang', position: 'SMALL_FORWARD', jerseyNumber: 13, nationality: 'Camerounaise', dateOfBirth: new Date('2002-07-27'), height: 195, weight: 86, teamId: '70aa782e-18b1-43ac-8001-664a55a70b77' },
    { firstName: 'Willy', lastName: 'Ekedi', position: 'SMALL_FORWARD', jerseyNumber: 16, nationality: 'Camerounaise', dateOfBirth: new Date('1997-11-09'), height: 193, weight: 84, teamId: '70aa782e-18b1-43ac-8001-664a55a70b77' },
    { firstName: 'Alex', lastName: 'Ntyam', position: 'SMALL_FORWARD', jerseyNumber: 19, nationality: 'Camerounaise', dateOfBirth: new Date('2003-02-15'), height: 191, weight: 83, teamId: '70aa782e-18b1-43ac-8001-664a55a70b77' },
    { firstName: 'Nicolas', lastName: 'Simo', position: 'POWER_FORWARD', jerseyNumber: 25, nationality: 'Camerounaise', dateOfBirth: new Date('1996-04-30'), height: 202, weight: 97, teamId: '70aa782e-18b1-43ac-8001-664a55a70b77' },
    { firstName: 'Bruno', lastName: 'Fokou', position: 'POWER_FORWARD', jerseyNumber: 29, nationality: 'Camerounaise', dateOfBirth: new Date('2000-10-05'), height: 206, weight: 102, teamId: '70aa782e-18b1-43ac-8001-664a55a70b77' },
    { firstName: 'Cyrille', lastName: 'Mbassi', position: 'POWER_FORWARD', jerseyNumber: 35, nationality: 'Camerounaise', dateOfBirth: new Date('1999-08-22'), height: 205, weight: 100, teamId: '70aa782e-18b1-43ac-8001-664a55a70b77' },
    { firstName: 'Robert', lastName: 'Amougou', position: 'CENTER', jerseyNumber: 41, nationality: 'Camerounaise', dateOfBirth: new Date('1995-01-18'), height: 210, weight: 109, teamId: '70aa782e-18b1-43ac-8001-664a55a70b77' },
    { firstName: 'Gustave', lastName: 'Ndzana', position: 'CENTER', jerseyNumber: 47, nationality: 'Camerounaise', dateOfBirth: new Date('1998-06-04'), height: 208, weight: 106, teamId: '70aa782e-18b1-43ac-8001-664a55a70b77' },

    // ALP de Yaoundé
    { firstName: 'Justin', lastName: 'Owoundi', position: 'POINT_GUARD', jerseyNumber: 2, nationality: 'Camerounaise', dateOfBirth: new Date('2001-04-06'), height: 179, weight: 74, teamId: 'bc5b0fb9-4dd7-4431-9902-35d87b99c1f5' },
    { firstName: 'Modeste', lastName: 'Zogo', position: 'POINT_GUARD', jerseyNumber: 5, nationality: 'Camerounaise', dateOfBirth: new Date('1999-08-14'), height: 182, weight: 76, teamId: 'bc5b0fb9-4dd7-4431-9902-35d87b99c1f5' },
    { firstName: 'Fabien', lastName: 'Nlend', position: 'SHOOTING_GUARD', jerseyNumber: 9, nationality: 'Camerounaise', dateOfBirth: new Date('2000-11-28'), height: 188, weight: 81, teamId: 'bc5b0fb9-4dd7-4431-9902-35d87b99c1f5' },
    { firstName: 'Elvis', lastName: 'Manga', position: 'SHOOTING_GUARD', jerseyNumber: 11, nationality: 'Camerounaise', dateOfBirth: new Date('1997-02-10'), height: 190, weight: 84, teamId: 'bc5b0fb9-4dd7-4431-9902-35d87b99c1f5' },
    { firstName: 'Toussaint', lastName: 'Amvela', position: 'SMALL_FORWARD', jerseyNumber: 14, nationality: 'Camerounaise', dateOfBirth: new Date('2002-06-19'), height: 194, weight: 85, teamId: 'bc5b0fb9-4dd7-4431-9902-35d87b99c1f5' },
    { firstName: 'Regis', lastName: 'Onguene', position: 'SMALL_FORWARD', jerseyNumber: 17, nationality: 'Camerounaise', dateOfBirth: new Date('1998-09-25'), height: 196, weight: 88, teamId: 'bc5b0fb9-4dd7-4431-9902-35d87b99c1f5' },
    { firstName: 'Ghislain', lastName: 'Meyong', position: 'SMALL_FORWARD', jerseyNumber: 20, nationality: 'Camerounaise', dateOfBirth: new Date('2003-03-02'), height: 192, weight: 83, teamId: 'bc5b0fb9-4dd7-4431-9902-35d87b99c1f5' },
    { firstName: 'Achille', lastName: 'Nga Bidias', position: 'POWER_FORWARD', jerseyNumber: 24, nationality: 'Camerounaise', dateOfBirth: new Date('1996-07-08'), height: 203, weight: 98, teamId: 'bc5b0fb9-4dd7-4431-9902-35d87b99c1f5' },
    { firstName: 'Zacharie', lastName: 'Mfegue', position: 'POWER_FORWARD', jerseyNumber: 27, nationality: 'Camerounaise', dateOfBirth: new Date('2000-12-16'), height: 205, weight: 101, teamId: 'bc5b0fb9-4dd7-4431-9902-35d87b99c1f5' },
    { firstName: 'Faustin', lastName: 'Owona', position: 'POWER_FORWARD', jerseyNumber: 33, nationality: 'Camerounaise', dateOfBirth: new Date('1999-05-04'), height: 204, weight: 99, teamId: 'bc5b0fb9-4dd7-4431-9902-35d87b99c1f5' },
    { firstName: 'Timothee', lastName: 'Ekomo', position: 'CENTER', jerseyNumber: 42, nationality: 'Camerounaise', dateOfBirth: new Date('1994-10-21'), height: 211, weight: 110, teamId: 'bc5b0fb9-4dd7-4431-9902-35d87b99c1f5' },
    { firstName: 'Leonard', lastName: 'Belomo', position: 'CENTER', jerseyNumber: 48, nationality: 'Camerounaise', dateOfBirth: new Date('1997-04-09'), height: 209, weight: 107, teamId: 'bc5b0fb9-4dd7-4431-9902-35d87b99c1f5' },

    // Moungo Zone de Nkongsamba
    { firstName: 'Hermann', lastName: 'Djuidje', position: 'POINT_GUARD', jerseyNumber: 1, nationality: 'Camerounaise', dateOfBirth: new Date('2000-01-30'), height: 180, weight: 75, teamId: '04d489a9-2ba4-4c52-a2ec-cb5abae07d4f' },
    { firstName: 'Parfait', lastName: 'Tchinda', position: 'POINT_GUARD', jerseyNumber: 6, nationality: 'Camerounaise', dateOfBirth: new Date('1999-04-17'), height: 181, weight: 76, teamId: '04d489a9-2ba4-4c52-a2ec-cb5abae07d4f' },
    { firstName: 'Adamou', lastName: 'Bouba', position: 'SHOOTING_GUARD', jerseyNumber: 8, nationality: 'Camerounaise', dateOfBirth: new Date('2001-07-05'), height: 189, weight: 82, teamId: '04d489a9-2ba4-4c52-a2ec-cb5abae07d4f' },
    { firstName: 'Josue', lastName: 'Nintcheu', position: 'SHOOTING_GUARD', jerseyNumber: 10, nationality: 'Camerounaise', dateOfBirth: new Date('1998-10-13'), height: 186, weight: 79, teamId: '04d489a9-2ba4-4c52-a2ec-cb5abae07d4f' },
    { firstName: 'Ulrich', lastName: 'Kenfack', position: 'SMALL_FORWARD', jerseyNumber: 13, nationality: 'Camerounaise', dateOfBirth: new Date('2002-01-22'), height: 195, weight: 86, teamId: '04d489a9-2ba4-4c52-a2ec-cb5abae07d4f' },
    { firstName: 'Steve', lastName: 'Pemi', position: 'SMALL_FORWARD', jerseyNumber: 15, nationality: 'Camerounaise', dateOfBirth: new Date('1997-05-19'), height: 193, weight: 84, teamId: '04d489a9-2ba4-4c52-a2ec-cb5abae07d4f' },
    { firstName: 'Ronald', lastName: 'Nganou', position: 'SMALL_FORWARD', jerseyNumber: 19, nationality: 'Camerounaise', dateOfBirth: new Date('2003-08-27'), height: 191, weight: 82, teamId: '04d489a9-2ba4-4c52-a2ec-cb5abae07d4f' },
    { firstName: 'Willy', lastName: 'Fossi', position: 'POWER_FORWARD', jerseyNumber: 22, nationality: 'Camerounaise', dateOfBirth: new Date('1996-02-14'), height: 202, weight: 97, teamId: '04d489a9-2ba4-4c52-a2ec-cb5abae07d4f' },
    { firstName: 'Landry', lastName: 'Djoko', position: 'POWER_FORWARD', jerseyNumber: 26, nationality: 'Camerounaise', dateOfBirth: new Date('2000-09-01'), height: 206, weight: 102, teamId: '04d489a9-2ba4-4c52-a2ec-cb5abae07d4f' },
    { firstName: 'Christian', lastName: 'Nya', position: 'POWER_FORWARD', jerseyNumber: 31, nationality: 'Camerounaise', dateOfBirth: new Date('1999-12-08'), height: 205, weight: 100, teamId: '04d489a9-2ba4-4c52-a2ec-cb5abae07d4f' },
    { firstName: 'Isaac', lastName: 'Tagne', position: 'CENTER', jerseyNumber: 40, nationality: 'Camerounaise', dateOfBirth: new Date('1995-03-26'), height: 210, weight: 109, teamId: '04d489a9-2ba4-4c52-a2ec-cb5abae07d4f' },
    { firstName: 'Rodrigue', lastName: 'Djeukam', position: 'CENTER', jerseyNumber: 44, nationality: 'Camerounaise', dateOfBirth: new Date('1998-08-11'), height: 208, weight: 106, teamId: '04d489a9-2ba4-4c52-a2ec-cb5abae07d4f' },

    // ACPBA de Yaoundé
    { firstName: 'Sylvain', lastName: 'Abena', position: 'POINT_GUARD', jerseyNumber: 4, nationality: 'Camerounaise', dateOfBirth: new Date('2001-06-02'), height: 178, weight: 73, teamId: '8b08f90b-9863-4f93-89f7-ad9998ad4047' },
    { firstName: 'Didier', lastName: 'Onana Bell', position: 'POINT_GUARD', jerseyNumber: 7, nationality: 'Camerounaise', dateOfBirth: new Date('1999-10-20'), height: 182, weight: 77, teamId: '8b08f90b-9863-4f93-89f7-ad9998ad4047' },
    { firstName: 'Blaise', lastName: 'Nkodo', position: 'SHOOTING_GUARD', jerseyNumber: 9, nationality: 'Camerounaise', dateOfBirth: new Date('2000-03-08'), height: 188, weight: 81, teamId: '8b08f90b-9863-4f93-89f7-ad9998ad4047' },
    { firstName: 'Anicet', lastName: 'Mbala', position: 'SHOOTING_GUARD', jerseyNumber: 12, nationality: 'Camerounaise', dateOfBirth: new Date('1997-07-16'), height: 190, weight: 83, teamId: '8b08f90b-9863-4f93-89f7-ad9998ad4047' },
    { firstName: 'Cabrel', lastName: 'Ondoua', position: 'SMALL_FORWARD', jerseyNumber: 15, nationality: 'Camerounaise', dateOfBirth: new Date('2002-11-24'), height: 194, weight: 85, teamId: '8b08f90b-9863-4f93-89f7-ad9998ad4047' },
    { firstName: 'Duplex', lastName: 'Ngo Ntamack', position: 'SMALL_FORWARD', jerseyNumber: 18, nationality: 'Camerounaise', dateOfBirth: new Date('1998-01-12'), height: 196, weight: 87, teamId: '8b08f90b-9863-4f93-89f7-ad9998ad4047' },
    { firstName: 'Emile', lastName: 'Bidjocka', position: 'SMALL_FORWARD', jerseyNumber: 21, nationality: 'Camerounaise', dateOfBirth: new Date('2003-05-29'), height: 192, weight: 84, teamId: '8b08f90b-9863-4f93-89f7-ad9998ad4047' },
    { firstName: 'Narcisse', lastName: 'Mekongo', position: 'POWER_FORWARD', jerseyNumber: 23, nationality: 'Camerounaise', dateOfBirth: new Date('1996-09-17'), height: 203, weight: 98, teamId: '8b08f90b-9863-4f93-89f7-ad9998ad4047' },
    { firstName: 'Beaugard', lastName: 'Ayissi', position: 'POWER_FORWARD', jerseyNumber: 28, nationality: 'Camerounaise', dateOfBirth: new Date('2000-04-03'), height: 205, weight: 101, teamId: '8b08f90b-9863-4f93-89f7-ad9998ad4047' },
    { firstName: 'Josias', lastName: 'Menye', position: 'POWER_FORWARD', jerseyNumber: 32, nationality: 'Camerounaise', dateOfBirth: new Date('1999-08-21'), height: 204, weight: 99, teamId: '8b08f90b-9863-4f93-89f7-ad9998ad4047' },
    { firstName: 'Appolinaire', lastName: 'Tabi', position: 'CENTER', jerseyNumber: 43, nationality: 'Camerounaise', dateOfBirth: new Date('1994-12-05'), height: 212, weight: 111, teamId: '8b08f90b-9863-4f93-89f7-ad9998ad4047' },
    { firstName: 'Honore', lastName: 'Nkolo', position: 'CENTER', jerseyNumber: 49, nationality: 'Camerounaise', dateOfBirth: new Date('1997-06-13'), height: 209, weight: 107, teamId: '8b08f90b-9863-4f93-89f7-ad9998ad4047' },
  ];

  const result = await prisma.player.createMany({
    data: players as any,
    skipDuplicates: true,
  });

  console.log(`✅ ${result.count} joueurs insérés avec succès !`);
}

main()
  .catch((e) => {
    console.error('❌ Erreur seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  