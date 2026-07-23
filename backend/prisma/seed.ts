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