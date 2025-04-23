export interface IAvenger {
    name: string
    powerScore: number
    wonBattles: number
    age: number
    // Este seria un metodo que se implementa en la clase
    battle: (enemy: IAvenger, win: boolean) => void
}
