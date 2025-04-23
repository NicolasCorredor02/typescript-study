"use client"
import { ComponentProps, MouseEvent, ComponentPropsWithoutRef, Dispatch, JSX, SetStateAction, useState, useRef } from "react"

 // Esto se agrega en Next para poder establecer funciones que interactuen con el cliente

// * ---------1 type para recibir propiedades CSS a traves de style ------------
// type ButtonProps = {
//   style: React.CSSProperties // Nombre reservado y permite acceder a todos los estilos soportados por el navegador
// };

// * ----------2 Dato de tipo Record -------------
// type ButtonProps = {
//   // userAges: Record<string, number> // Con este tipo de dato se puede especificar el par clave y valor que se esperan
//   userAges: Record<"Alice" | "Bob" | "Jose", number>
// }

// * ----------3 Tipado de funciones y sus params -----------
// type ButtonProps = {
//   onClick: (text: string) => void
// }

// function Button({ onClick }: ButtonProps) {
//   /**
//    * Al hacer el tipado de la funcion en el type ButtonProps, genera un error
//    * ya que el parametro inicial de la prop onClick de un button siempre debe
//    * ser un evento (funcion), por lo tanto se cambia de onClick={onClick} a
//    * onClick={() => onClick("Hello World!")}
//    */
//   return <button onClick={() => onClick("Hello World!")}>test</button>;
// }

// * -----------------4 tipado de hijos de componentes ----------------
// type ButtonProps = {
//   children: React.ReactNode // Lo que hace este tipo de dato es especificar cualquier tipo de elemento hijo
//   // children: JSX.Element | JSX.Element[] | string // Lo que hace este tipo de dato es especificar cualquier tipo de elemento hijo que sea unicamente JSX
// }

// function Button({ children }: ButtonProps) {
//  return <button>test</button>
// }

// * ----------------5 tipado de Hooks ---------------------
// type ButtonProps = {
//   setCount: Dispatch<SetStateAction<number>>
//   count: number
// }

// function Button({ setCount, count = 0 }: ButtonProps) {
//   return <button onClick={() => setCount(count + 1)}>test</button>
// }

// * -----------------6 Default props --------------------
// type ButtonProps = {
//   title?: string
//   count?: number
// }

// function Button({ title = "Text Here!" }: ButtonProps) { // Cundo se dejan props por defecto no es necesario usar un type como lo viene siendo ButtonProps, ya que, TS infiere que el prop es del tipo default
//   return <button>{title}</button>
// }

// * -----------------7 Alias vs Interfaces ----------------
// type ButtonProps = {
//   title?: string
//   count?: number
// }

// Las interfaces siempren van a esperar que tengan tipado un objeto
// interface ButtonProps {
//   title?: string
//   count?: number
// }

// function Button({  }: ButtonProps) {
//   return <button>test</button>
// }

// * --------------8 Props personalizadas ----------------
// type ButtonProps = ComponentPropsWithoutRef<"button"> // Component props espera todas las propiedades de la etiqueta que se especifique entre <"component">

// function Button({ href, target, className, onClick }: ButtonProps) { // Aca en las props se destructuran todas las propiedades o metodos que puede recibir el componente "button"
//   return <button>test</button>
// }

// * -------------9 Spread operator -----------------
// type ButtonProps = ComponentPropsWithoutRef<"button"> // Component props espera todas las propiedades de la etiqueta que se especifique entre <"component">

// function Button({ onClick, ...rest }: ButtonProps) { // Al user ...rest es usar las propiedades restantes del objeto
  
//   const handleClick = () => {
//     if (onClick) {
//       alert('clicked')
//     }
//   }

//   return <button onClick={handleClick} {...rest}>test</button> // Aca se usa el spread operator para asignarlas dentro del button, aca es como copiar todos los elementos del objeto props dentro del componente, 
// }

// * ------------10 Intersection y extends --------------
// type Props = ComponentPropsWithoutRef<"button"> 

// type ButtonProps = Props & {
//   dark?: boolean
//   vaiant?: "primary" | "secondary"
//   children: boolean // Aca se esta sobre escribiendo el tipo del elemento children que viene por defecto, este por defecto es un elemento de React
// }//El simbolo & significa que se añadiran propiedades extra

// function Button({ dark, variant, children }: ButtonProps) { 

//   return <button>test</button> 
// }

// * ----------------------11 Event Handlers ------------------
// type ButtonProps = ComponentPropsWithoutRef<"button"> 

// function Button({ }: ButtonProps) { 

//   // Forma con const
//   // const handleClick = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    
//   // }

//   // Forma con function
//   function handleClick(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    
//   }

//   return <button onClick={handleClick}>test</button> 
// }

// * --------------12 tipado de hooks ------------------
// function Button() { 

//   type User = {
//     name: string
//     age: number
//   }

//   const [count, setCount] = useState(0) // No es necesario declarar el tipo ya que TS lo infiere
//   const [text, setText] = useState("Button")
//   const [active, setActive] = useState(false)

//   const [user, setUser] = useState<User | null>(null) // Se typea con el type de User o null y se inicia en null

//   console.log(user?.name) // Ya que el usuario puede ser null, se agrega el ? para tener en cuenta si existe o no

//   // tipado de useRef
//   // useRef permite poder acceder a un elemento de la interfaz
//   const myButton = useRef<HTMLButtonElement>(null)

//   // Al llamar al boton pueda acceder a .current. y todas las propiedades que tiene el boton
//   // myButton.current.

//   return <button ref={myButton}>test</button> 
// }

// * -----------------13 Utility types -----------------
// type User = {
//   name: string
//   age: number
//   email: string
//   password: string
// }

// type UserWithoutPassword = Omit<User, "password"> // Con Omit retorna el tipo sin el dato especificado

// type UpdateUser = Partial<User> // Crea una copia del dato de tipo User solo que los datos seran opcionales en este caso

// type UserPublicData = Pick<User, "name" | "email"> // Con este utility type se crea un type con campos seleccionados de otro type como en este caso, solo se toman los campos de name y email de User

// // Tambien se pueden encadenar para hacer utility types encadenados
// type OptionalUserWithoutPassword = Partial<Omit<User, "password">>

// type Status = "active" | "inactive" | "pending" | "deleted" | "blocked"

// type AllowedStatus = Exclude<Status, "inactive" | "pending">

// function Button() { 
//   const [user, setUser] = useState<User|null>(null)
//   const myButton = useRef<HTMLButtonElement>(null)

//   function sendData() {
//     const user: UserWithOuUserWithoutPasswordtPassword = {
//       name: "Nicolas",
//       age: 24,
//       email: "correo@gmail.com"
//     }
//   }

//   function updateUser(user:UpdateUser) {
//     console.log(user.name)
//   }

//   return <button>test</button> 
// }

// * ------------14 Operador AS ---------------------
// el operador as permite decirle al compilador que trate al dato de una forma especifica
// let someValue: unknown = "Hello String"

// let stringLength = (someValue as string).length

// type User = {
//   id: number
//   name: string
// }

// let user: unknown = {
//   id: 1,
//   name: "Name"
// }

// const newUser = user as User

// const colors = ["red", "green", "blue"] as const // as const lo tratara como readonly

// let num: number = 123
// let str = num as unknown as string
// // Ahora el str que inicialmente era de tipo number se puede tratar conmo un string gracias a tratarlo as unknow y luego as string
// str.trim()

// * ---------------15 Generics -------------------------
// Cunando se trabaja con Generics, es la creacion de componentes reutilizables que puedan trabajr con distintos tipos de datos
function identity<T>(value:T) { // Aca lo que hace es evaluar el tipo de dato cuando se llame a la funcion
  return value
}

function getFirstElement<T>(arr: T[]) {
  return arr[0]
}

getFirstElement([1,2,3])
getFirstElement(["1", "2", "3"])
getFirstElement([true, false, true])

type ApiResponse<T> = {
  status: number
  data: T
}

const response1: ApiResponse<{name: string; age: number}> = {
  status: 200,
  data: {
    name: "Jhon",
    age: 30
  }
}

const response2: ApiResponse<string> = {
  status: 200,
  data: "string"
}

const response3: ApiResponse<object[]> = {
  status: 200,
  data: [
    {
      name: "Objeto1"
    },
    {
      name: "Objeto2"
    }
  ]
}

interface Box<T> {
  content: T
}

const box1: Box<string> = {content: "Hello"}
const box2: Box<number> = {content: 123}

function Page() {
  // *5
  // const [count, setCount] = useState<number>(0) // Aca se puede tipar el estado con <type>
  // const [count, setCount] = useState(0) // Aca se puede tipar el estado con <type>

  // *14
  // const inputElement = document.getElementById('username') as HTMLInputElement

  // *15
  identity<string>("Hello")
  identity<number>(123)
  identity<boolean>(true)

  return (
    // <Button
    // *1
    // style = {{
    //   color: "gold",
    //   fontSize: "160px"
    // }}
    // *2
    // userAges={{
    //   // alice: 20,
    //   // bob: 22,
    //   // charlie: 33
    //   // Alice: 20,
    //   // Bob: 22,
    //   // Jose: 33
    // }}
    // *3
    // onClick={() => {
    //   alert('Click funcional')
    // }}
    // />
    // *4
    // <div>
    //   <Button>
    //     <div></div>
    //     <span></span>
    //   </Button>
    // </div>
    // *5
    // <div>
    //   <h1>{count}</h1>
    //   <Button setCount={setCount} count={count}/>
    // </div>
    // *6
    // <div>
    //   <Button />
    // </div>
    // *7
    // <div>
    //   <Button />
    // </div>
    // *8
    // <div>
    //   <Button />
    // </div>
    // *9
    // <div>
    //   <Button onClick={() => { alert('Hello World!') }}/>
    // </div>
    // *10
    // <div>
    // <Button>
    //   {true}
    // </Button>
    // </div>
    // *11
    // <div>
    //   <Button/>
    // </div>
    // *12
    // <div>
    //   <Button/>
    // </div>
    // *13
    // <div>
    //   <Button/>
    // </div>
    // *14
    // <div>
    //   <input type="text" id="username"/>
    // </div>
    // *15
    <div>
      
    </div>
  )
}

export default Page;
