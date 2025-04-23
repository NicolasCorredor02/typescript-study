// * ------------------------------ Declaracion de tipos ------------------------------
const number = 1
let n: number = 2

let a = 'hola'
let aaa = null
let b: undefined = undefined

/**
 * Inferencia de tipos esto se puede al acceder a algun metodo de un const o let:
 *  a.(metodo) // Va a sugerir metodos que sean de String ya que lo toma como un String
 *  number.(metodo) // Va a sugerir metodos que funcionen con valores numericos
 */

// * -------------------------- No inferencia de un tipo ----------------------------
/**
 * Al no establecer el tipo ni el valor, TS decalra esta variable como any
 * ! el any hace que IGNORE el tipado de TS es importante evitarlo
 */
let inferenciaAny: any  = 'Ignora el tipado de TS'

/**
 * Otro ejemplo seria unknown este es un tipo que establece que no se conoce que tipo tendra el dato
 * ! Al igual que con any es importante evitarlo 
 */
let unknownValue: unknown = 'UnkNown Value'

// * -------------------------- Inferencia de funciones -----------------------------
/**
 * TS establecer como any al parametro name, por lo tanto es necesario establecer de que tipo
 * sera cada parametro que se encuentre en la funcion
 */
function saludar(name: string) {
    console.log(`Hola ${name}`)
}
/**
 * Aca se genera un error de syntaxis ya que name: strign y age: number
 * no esta especificando el tipo sino dano un valor de name como string y age como numer
 * por lo tanto al acceder seria obj.name = undefiend =>  obj.string = value
 */
function saludarPorObjeto({ name: string, age: number }) {
    console.log(`Hola ${name}, tienes ${age} años`)
}

/**
 * FORMA CORRECTA SEGUN TS
 */
function saludarPorObjetoBienOpt1({ name, age }: {name: string, age: number}) {
    console.log(`Hola ${name}, tienes ${age} años`)
    return age // Aca la inferencia toma que el valor retornado corresponde a un number
}
function saludarPorObjetoBienOpt2(persona: { name: string, age: number }) {
    const { name, age } = persona
    console.log(`Hola ${name}, tienes ${age} años`)
}

let userName: string

userName = saludarPorObjetoBienOpt1({ name:'Pepe', age: 32 })

/**
 * Para el tipado de funciones que tienen funciones como parametro o tambien 
 * funciones con CB.
 * ! no se puede usar como tipado function, ya que esto, es como usar any
 * Al no especificar en tipado este lo tomara como any
 */

/**
 * void se usa cuando una funcion no retorna nada, pero se puede
 * especificar que tipo de dato devuelve siempre y cuando la CB lo devuelva
 * ya sea string, boolean, number, etc
 */
const sayHiWithCb = (cb: (name:string) => void ) => {
    return cb('Nicolas')
}

const sayHi = (name: string) => {
    console.log(`Hola ${name}`)
}

sayHiWithCb(sayHi)

// Forma 1
const sumar = (a: number, b: number): number => {
    return a + b
}

//Forma 2
const restar: (a: number, b: number) => number = (a, b) => {
    return a - b
}

/**
 * El retorno never en vez de void en una funcion se usa para aquellas funciones 
 * que nunca van a retornar nada, el ejemplo mas comun es cuando se usar un 
 * throw, este corta la ejecucion y produce un error.
 * 
 * void => no importa lo que devuelva
 * never => no retornada nada nuca
 */

function throwError(message: string): never {
    throw new Error(message)

    // return implicito de la funcion que no se llega a ejecutar por el throw 
}

// * ----------------------------- Template union types ----------------------------
// type HeroId = `${string}-${string}-${string}-${string}-${string}`

// * ----------------------------- Type Alias ------------------------------
// Los types se nombran con PasscalCase
// type Hero = {
//     readonly id?: HeroId
//     name: string
//     age: number
//     isActive?: boolean
// }

// let hero: Hero = {
//     name: 'Thor',
//     age: 1500
// }

// function createHero(hero: Hero): Hero {
//     const { name, age } = hero
//     return { name, age, isActive: true }
// }

// const thor = createHero({ name: 'Thor', age: 1500 })
// console.log(thor.isActive) // => true

// * ------------------------------ Union types ----------------------------
// Aca se esta usando | como union para hacer un tipo de enum que tomara lo valores y solo estos
// type HeroPowerScale = 'local' | 'planetario' | 'alpha' | 'good'
// type HeroId = `${string}-${string}-${string}-${string}-${string}`

// let annn: number | string


// type Hero = {
//     readonly id?: HeroId
//     name: string
//     age: number
//     isActive?: boolean
// }

// let hero: Hero = {
//     name: 'Thor',
//     age: 1500
// }

// function createHero(hero: Hero): Hero {
//     const { name, age } = hero
//     return { name, age, isActive: true }
// }

// const thor = createHero({ name: 'Thor', age: 1500 })
// console.log(thor.isActive) // => true

// * ----------------------- Intersection types ----------------------------
// type HeroPowerScale = 'local' | 'planetario' | 'alpha' | 'good'
// type HeroId = `${string}-${string}-${string}-${string}-${string}`

// let annn: number | string

// type HeroBasicInfo = {
//     name: string
//     age: number
// }


// type HeroProperties = {
//     readonly id?: HeroId
//     isActive?: boolean
// }

// type Hero = HeroBasicInfo & HeroProperties

// let hero: Hero = {
//     name: 'Thor',
//     age: 1500
// }

// function createHero(input: HeroBasicInfo): Hero {
//     const { name, age } = input
//     return { 
//         id: crypto.randomUUID(),
//         name, 
//         age, 
//         isActive: true }
// }

// const thor = createHero({ name: 'Thor', age: 1500 })
// console.log(thor.isActive) // => true

// * ----------------------------------- Type Indexing --------------------------
// Este tipo tiene indexado un tipo con otros tipos dentro
// type HeroProperties = {
//     isActive: boolean
//     address: {
//         planet: string
//         city: string
//     }
// }
/**
 * Para acceder a este tipo indexado se puede usar el tipo general HeroProperties['address']
 * con esto el tipo addressHero tendra que se del tipo address de HeroProperties
 */

// const addresHero: HeroProperties['address'] = {
//     city: 'Bogota',
//     planet: 'Tierra'
// }

// // * Type from values
// const address = {
//     planet: 'Earth',
//     city: 'Bogota'
// }

// type Address = typeof address

// const addressByValue: Address = {
//     planet: 'Valor a partir de const address',
//     city: 'Valor a partir de const address'
// }

// * ---------------------------- Type from function return --------------------
// function createAddress() {
//     return { 
//         planet: 'Tierra',
//         city: 'Bogota'
//     }
// }
// // Recupera el tipo de lo que devuelve la funcion createAddress
// type AdreessFromFunction = ReturnType<typeof createAddress>

// * ----------------------- Arrays ----------------------------
const languages: (string | number)[] = []
// const language: Array<string> = [] // Esta es otra opcion de declarar el array

languages.push('Spanish')
languages.push('Spanish')
languages.push('Spanish')
languages.push('Spanish')
languages.push(2)

// Este seria un array que acepta un tipo mas complejo
type HeroBasicInfo = {
    name: string
    age: number
}

const herosWithBasicInfo: HeroBasicInfo[] = []

// * ----------------------- Matrices y tuplas -----------------------
/**
 * [
 *  ['x', 'o', 'x'] // string[]
 *  ['o', 'x', 'o'] // string[]
 *  ['o', 'x', 'o'] // string[]
 * ]
 */

type CellValue = 'x' | 'o' | ''
/**
 * Esto se conoce como tupla, una tupla es un array que tiene un limite 
 * fijado de longitud, aca se esta tipando un array que en su 1er posicion
 * es un array de 3 posiciones y asi susecivamente con cada posicion del array
 * principal, cada uno de estos tendra un array de 3 posiciones
 */
type GameBoard = [
    [CellValue, CellValue, CellValue],
    [CellValue, CellValue, CellValue],
    [CellValue, CellValue, CellValue]
]

// Aca el tipó seria un array de arrays con strings del type CellValue
const gameBoard: CellValue[][] = [
    ['x', 'o', 'x'],
    ['o', 'x', 'o'],
    ['o', 'x', 'o']
]

// gameBoard[0][1] = '65465498498' // !ERROR AL INGRESAR UN TYPO NO ENUM
gameBoard[0][1] = 'x'

// TUPLAS
// type State = [string, (name: string) => void]
// const [hero, setHero] = useState('thor')

// type RGB = [number, number, number]


/**
 * ! Al hacer un .push en rgb este lo almacenara aunque se haya especificado solo 3 posiciones en el array
 * Es to se puede arreglar añadiendo el readonly al array 
*/

type RGB = readonly [number, number, number]
const rgb: RGB = [4, 6, 6]

// rgb.push(4) // ! ERROR ya que no permite mutar el arrya original

// * ------------------------ Enums ------------------------

// en JS
const ERROR_TYPES = {
    NOT_FOUND: 'not found',
    UNAUTHORIZED: 'unauthorized',
    FORBIDDEN: 'forbidden',
}

function mostrarMensaje(tipoError) {
    if(tipoError === ERROR_TYPES.NOT_FOUND) {
        console.log('No encontrado')
    } else if(tipoError === ERROR_TYPES.UNAUTHORIZED) {
        console.log('No autorizado')
    } else if(tipoError === ERROR_TYPES.FORBIDDEN) {
        console.log('Prohibido')
    } else {
        console.log('Error desconocido')
    }   
}

// Los emums que son destinados para ser usados afuero o cunsimidos por otros modulos es mejor declararlos sin const

// en TS lo mejor es usar enums para estos casos donde se necesite aplicar una coleccion de datos finita
const enum ERROR_TYPES_IN_TS {
    NOT_FOUND,
    UNAUTHORIZED,
    FORBIDDEN,
}

function mostrarMensajeTs(tipoError: ERROR_TYPES_IN_TS) {
    if(tipoError === ERROR_TYPES.NOT_FOUND) {
        console.log('No encontrado')
    } else if(tipoError === ERROR_TYPES.UNAUTHORIZED) {
        console.log('No autorizado')
    } else if(tipoError === ERROR_TYPES.FORBIDDEN) {
        console.log('Prohibido')
    } else {
        console.log('Error desconocido')
    }   
}

// * ----------------------- Aserciones de tipos ---------------------
/**
 * Las aserciones de tipos es una forma de decirle a TS que un valor es de un tipo especifico
 * sin que TS lo infiera. Esto es util cuando se sabe que un valor es de un tipo especifico
 */

const canvas = document.getElementById('canvas') // Esto puede retornar null o HTMLElement si lo encuentra, pero HTMLElement no es un elemento especifico de HTML

// Como sabe TS que realmente se esta recuperando un elemento HTML de tipo canvas

if(canvas){
    const ctx = canvas.getContext('2d') // ! ERROR ya que no sabe si es un canvas o null
}

// Para solucionar esto se hace un type assertion, que le dice a TS que el elemento es un canvas
const canvas2 = document.getElementById('canvas') as HTMLCanvasElement

if(canvas){
    const ctx = canvas2.getContext('2d')
}

// La mejor opcion es validar los dos datos tanto para null como para el tipo de elemento que se espera
if(canvas !== null && canvas instanceof HTMLCanvasElement) {
    const ctx = canvas.getContext('2d')
}

// * ----------------------- Fetching de datos en TS ---------------------------
const API_URL = 'https://hp-api.onrender.com/api/characters'

// * -------------------- types generados por quicktype.io ------------------
export type CharacterOfHarryPotter = {
    id:               string;
    name:             string;
    alternate_names:  string[];
    species:          string;
    gender:           Gender;
    house:            House;
    dateOfBirth:      null | string;
    yearOfBirth:      number | null;
    wizard:           boolean;
    ancestry:         Ancestry;
    eyeColour:        EyeColour;
    hairColour:       HairColour;
    wand:             Wand;
    patronus:         Patronus;
    hogwartsStudent:  boolean;
    hogwartsStaff:    boolean;
    actor:            string;
    alternate_actors: string[];
    alive:            boolean;
    image:            string;
}

export enum Ancestry {
    Empty = "",
    HalfBlood = "half-blood",
    HalfVeela = "half-veela",
    Muggle = "muggle",
    Muggleborn = "muggleborn",
    PureBlood = "pure-blood",
    QuarterVeela = "quarter-veela",
    Squib = "squib",
}

export enum EyeColour {
    Amber = "amber",
    Beady = "beady",
    Black = "black",
    Blue = "blue",
    Brown = "brown",
    Dark = "dark",
    Empty = "",
    Green = "green",
    Grey = "grey",
    Hazel = "hazel",
    Orange = "orange",
    PaleSilvery = "pale, silvery",
    Scarlet = "Scarlet",
    Silver = "silver",
    White = "white",
    Yellow = "yellow",
    Yellowish = "yellowish",
}

export enum Gender {
    Empty = "",
    Female = "female",
    Male = "male",
}

export enum HairColour {
    Bald = "bald",
    Black = "black",
    Blond = "blond",
    Blonde = "blonde",
    Brown = "brown",
    Dark = "dark",
    Dull = "dull",
    Empty = "",
    Ginger = "ginger",
    Green = "green",
    Grey = "grey",
    Purple = "purple",
    Red = "red",
    Sandy = "sandy",
    Silver = "silver",
    Tawny = "tawny",
    White = "white",
}

export enum House {
    Empty = "",
    Gryffindor = "Gryffindor",
    Hufflepuff = "Hufflepuff",
    Ravenclaw = "Ravenclaw",
    Slytherin = "Slytherin",
}

export enum Patronus {
    Boar = "boar",
    Doe = "doe",
    Empty = "",
    Goat = "goat",
    Hare = "hare",
    Horse = "horse",
    JackRussellTerrier = "Jack Russell terrier",
    Lynx = "lynx",
    NonCorporeal = "Non-Corporeal",
    Otter = "otter",
    PersianCat = "persian cat",
    Phoenix = "Phoenix",
    Stag = "stag",
    Swan = "swan",
    TabbyCat = "tabby cat",
    Weasel = "weasel",
    Wolf = "wolf",
}

export type Wand = {
    wood:   string;
    core:   Core;
    length: number | null;
}

export enum Core {
    DragonHeartstring = "dragon heartstring",
    Empty = "",
    PhoenixFeather = "phoenix feather",
    PhoenixTailFeather = "phoenix tail feather",
    UnicornHair = "unicorn hair",
    UnicornTailHair = "unicorn tail hair",
}


/**
 * Aca TS te muestra un error ya que en archivos .ts no se puede hacer un fetch sin especificar el tipo de dato que se espera
 * Por lo tanto se cambia el archivo a .mts para que TS lo reconozca como un modulo y no como un script
 */
const response = await fetch(API_URL)

if(!response.ok) {
    throw new Error('Error al obtener los datos')
}

// ! Aca data es de tipo any, por lo tanto no se puede acceder a los metodos o valores que tenga
/**
 * Una forma de tipar el fech es agregando el tipo de dato que se espera 
 * una herramienta para esto sin necesidad de hacerlo manualmente es quicktype.io
 * Aca se puede pegar el JSON y este genera el tipo de dato que se espera
 */
const data = await response.json() as CharacterOfHarryPotter[]

const personajes = data.map((characters) => {
    console.log(`Personaje: ${characters.name} actor: ${characters.actor}`)
})

console.log(personajes)


// *  ------------------------ Interfaces ---------------------
// type Hero = {
//     id: number
//     name: string
//     age: number
// }

// Interfaz 
interface Hero {
    id: number
    name: string
    age: number
    saludar: () => void
}

// Objeto que implementa la interfaz Hero
const hero: Hero = {
    id: 1,
    name: 'Thor',
    age: 1500,
    saludar: () => {
        console.log(`Hola soy ${hero.name}`)
    }
}

// * ------------- Anidamiento de interfaces y extension para compartir propiedades ------------
interface Producto {
    id: number
    nombre: string
    precio: number
    stock: number
    categoria: string
}

// Extension
interface Zapatilla extends Producto{
    talla: string
}

// Anidacion
interface Carrito {
    total: number
    productos: (Producto | Zapatilla)[]
}

const carrito: Carrito = {
    total: 699.99,
    productos: [
        {
            id: 1,
            nombre: 'Camiseta',
            precio: 19.99,
            stock: 10,
            categoria: 'Ropa'
        },
        {
            id: 2,
            nombre: 'Pantalon',
            precio: 49.99,
            stock: 5,
            categoria: 'Ropa'
        },
        {
            id: 3,
            nombre: 'Zapatos',
            precio: 89.99,
            stock: 2,
            categoria: 'Calzado'        
        },
        {  
            id: 1,
            nombre: 'Camiseta',
            precio: 19.99,
            stock: 10,
            categoria: 'Zapatillas',
            talla: 'M'
        }
    ]
}



// Metodos en interfaces

// Forma 1
interface CarritoOps {
    add: (producto: Producto) => void
    delete: (id: number) => void
    clear: () => void
}

// Forma 2
interface CarritoOps2 {
    add(producto: Producto): void
    delete(id: number): void
    clear(): void
}   

// * ----------------- Narrowing ------------------
// interface Mario {
//     company: 'nintendo'
//     nombre: string
//     saltar: () => void
// }

// interface Sonic {
//     company: 'sega'
//     nombre: string,
//     correr: () => void
// }

// type Personaje = Mario | Sonic

// function jugar(personaje: Personaje) {
//     if(personaje.company === 'nintendo') {
//         personaje.saltar() // Este es mario ya que se valida que el valor de company sea nintendo
//         return
//     }
//     personaje.correr() 
// }

/**
 * Existe una forma para poder hacer esta diferenciacion sin necesidad de implementar company
 * Eso es usando type guards
*/

interface Mario {
    nombre: string
    saltar: () => void
}

interface Sonic {
    nombre: string,
    correr: () => void
}

type Personaje = Mario | Sonic

// ! Es mejor tratar de evitar esto, pero de ser necesario, se puede aplicar
// Type Guard
//1. Quiero que me indiques si el personaje es del type Sonic
function checkIsSonic(personaje:Personaje): personaje is Sonic {
    // 2. El personaje va a ser sonic si tratando al personaje como Sonic, .correr() es diferente a undefined
    return (personaje as Sonic).correr !== undefined
}
function jugar(personaje: Personaje) {
    if(checkIsSonic(personaje)) {
        personaje.correr()
    } 
}

// *  ---------------------- Tipado de una clase -------------------------
import { type IAvenger } from "./types"
/**
 * Para las clases tambien se pueden implementar las interfaces
 * haciendo uso de implements
 */
class Avenger implements IAvenger{
    // Si se implementa una interfaz esta parte se iria 
    readonly name: string
    powerScore: number // Es como usar # para poder acceder a esta propiedad unicamente en el interior de la clase pero esto no se transpila a JS
    wonBattles: number = 0
    age: number

    /**
     * Existe tambien los indicadores public que vendria siendo el que se aplica por defecto
     * y el protected que inidica que unicamente aquellas clases hijas pueden acceder a esta propiedad 
     */

    constructor(name: string, powerScore:number) {
        this.name = name
        this.powerScore = powerScore
    }

    get fullName() {
        return `${this.name}, de poder ${this.powerScore}`
    }

    // Aca se implementaria el metodo creado en la interfaz
    battle (enemy, win) {
        if(win) {
            this.wonBattles++
            this.powerScore += 5
        } else {
            this.powerScore -= 5
        }
    } 

    set power(newPower: number) {
        if(newPower <= 100) {
            this.powerScore = newPower
        } else {
            throw new Error('Power score cannot be more than 100')
        }
    }
}

const avenger = new Avenger('Spiderman', 85)