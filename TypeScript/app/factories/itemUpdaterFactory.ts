import { Item } from "../gilded-rose";
import { ItemUpdater } from "../updaters/itemUpdater";
import { NormalItemUpdater } from "../updaters/normalItemUpdater";
import { AgedBrieUpdater } from "../updaters/agedBrieUpdater";
import { BackstageUpdater } from "../updaters/backstagePassUpdater";
import { SulfurasUpdater } from "../updaters/sulfurasUpdater";
import { ConjuredUpdater } from "../updaters/conjuredUpdater";

type Matcher = (item: Item) => boolean;

interface Rule {
  matcher: Matcher;
  updater: new () => ItemUpdater;
}

export class ItemUpdaterFactory {
  private static rules: Rule[] = [
    {
      matcher: (item) => item.name === "Aged Brie",
      updater: AgedBrieUpdater,
    },

    {
      matcher: (item) => item.name.startsWith("Backstage passes"),
      updater: BackstageUpdater,
    },

    {
      matcher: (item) => item.name === "Sulfuras, Hand of Ragnaros",
      updater: SulfurasUpdater,
    },

    {
      matcher: (item) => item.name.startsWith("Conjured"),
      updater: ConjuredUpdater,
    },
  ];

  static create(item: Item): ItemUpdater {
    const rule = this.rules.find((r) => r.matcher(item));

    return rule ? new rule.updater() : new NormalItemUpdater();
  }
}
