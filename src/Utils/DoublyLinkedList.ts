import { Pokemon } from '../Types/Pokemon';

class Node<T> {
  public next: Node<T> | null = null;
  public prev: Node<T> | null = null;
  constructor(public data: T) {}
}

export class DoublyLinkedList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;

  private size: number;

  constructor() {
    this.size = 0;
  }

  public getSize(): number {
    return this.size;
  }

  public isEmpty(): boolean {
    return this.size === 0;
  }

  public contains(data: T): boolean {
    if (this.isEmpty()) {
      return false;
    }

    let current = this.head;
    while (current) {
      if (current.data === data) {
        return true;
      }
      current = current.next;
    }

    return false;
  }

  public search(index: number): Node<T> | null {
    if (index < 0 || index >= this.size || this.isEmpty()) {
      throw new Error('Index out of bounds');
    }

    if (index === 0) {
      return this.getFirst();
    }

    let current = this.head;
    let i = 0;
    while (current !== null && i < index) {
      i++;
      current = current.next;
    }

    return current;
  }

  public getFirst(): Node<T> | null {
    return this.head;
  }

  public getLast(): Node<T> | null {
    return this.tail;
  }

  public insertAtEnd(data: T): void {
    const node = new Node(data);

    if (this.tail == null) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.size++;
  }

  public insert(data: T): void {
    const node = new Node(data);

    if (this.head == null) {
      this.head = this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.size++;
  }

  public removeFirst(): void {
    if (this.isEmpty()) {
      throw new Error('List is empty');
    }

    if (this.size === 1) {
      this.head = this.tail = null;
    } else {
      this.head = this.head!.next;
      this.head!.prev = null;
    }
    this.size--;
  }

  public removeLast(): void {
    if (this.isEmpty()) {
      throw new Error('List is empty');
    }

    if (this.size === 1) {
      this.head = this.tail = null;
    } else {
      this.tail = this.tail!.prev;
      this.tail!.next = null;
    }
    this.size--;
  }

  public indexOfPokemon(pokemonId: number): number {
    let index = 0;
    let current = this.head;
    while (current !== null) {
      if ((current.data as Pokemon).id === pokemonId) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  }

  public movePokemonToFront(node: Node<T>): void {
    if (node === this.head) {
      return;
    }

    if (node === this.tail) {
      this.tail = node.prev;
      this.tail!.next = null;
    } else {
      node.prev!.next = node.next;
      node.next!.prev = node.prev;
    }

    node.next = this.head;
    node.prev = null;
    this.head!.prev = node;
    this.head = node;

    console.log(
      `[${this.constructor.name}] Moved ${
        (node.data as Pokemon).name
      } to front of linked list`
    );
  }

  public delete(node: Node<T>): void {
    if (node === this.head) {
      this.removeFirst();
    } else if (node === this.tail) {
      this.removeLast();
    } else {
      node.prev!.next = node.next;
      node.next!.prev = node.prev;
      this.size--;
    }

    console.log(
      `[${this.constructor.name}] Deleted ${
        (node.data as Pokemon).name
      } from linked list`
    );
  }

  public display(): void {
    if (this.isEmpty()) {
      console.log('List is empty');
      return;
    }

    let node = this.head;
    while (node !== null) {
      process.stdout.write((node.data as Pokemon).name + ' <--> ');
      node = node.next;
    }
    console.log();
  }
}
