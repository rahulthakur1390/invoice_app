import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddEditDetailsService {

  constructor() { }

  getAllProductTypes(): Array<string> {
    return ['Bar', 'Box', 'Piece', 'Packet'];
  }
}
