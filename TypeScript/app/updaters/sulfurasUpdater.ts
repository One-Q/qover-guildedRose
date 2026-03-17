import { ItemUpdater } from "@/updaters/itemUpdater";
import { Item } from "@/gilded-rose";

export class SulfurasUpdater extends ItemUpdater {
  // Sulfuras never changes
  update(item: Item): void {}
}
