import { Game } from "../../Game";
import { ICommand } from "../../utils/type";
import { Controller } from "../Controllers";

/*
Les commands réprésente tous les interactions que les joueurs avoir le jeux (Mouvement, spell, menu...)
Context: A chaque Rendu le controller regarde quelle commande il doit exectuer selon leur conditions. 
condition: la conditions qui dicte si on doit executer la commande ou non
finish: Une fonction qui execute quand la commande à finit d'être éxécuté. (Utile surtout pour les animations)
*/

export class Command implements ICommand {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }
  execute() {
    return;
  }

  finish() {
    return;
  }

  condition(_controller: Controller): boolean {
    return false;
  }
}
