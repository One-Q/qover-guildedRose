import { ItemUpdaterFactory } from "@/factories/itemUpdaterFactory";
import { GildedRose, Item } from "@/gilded-rose";
import { AgedBrieUpdater } from "@/updaters/agedBrieUpdater";
import { BackstageUpdater } from "@/updaters/backstagePassUpdater";
import { ConjuredUpdater } from "@/updaters/conjuredUpdater";
import { NormalItemUpdater } from "@/updaters/normalItemUpdater";
import { SulfurasUpdater } from "@/updaters/sulfurasUpdater";

describe("Gilded Rose", () => {
  describe("Normal item", () => {
    it("normal item decreases sellIn and quality", () => {
      const items = [new Item("Normal Item", 10, 20)];
      const gildedRose = new GildedRose(items);

      gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(19);
    });

    it("quality never negative", () => {
      const items = [new Item("Normal Item", 10, 0)];
      const gildedRose = new GildedRose(items);

      gildedRose.updateQuality();

      expect(items[0].quality).toBe(0);
    });

    it("quality degrades twice as fast after sell date", () => {
      const items = [new Item("Normal Item", 0, 10)];
      const gildedRose = new GildedRose(items);

      gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(8);
    });
  });

  describe("Aged Brie", () => {
    it("Aged Brie increases in quality", () => {
      const items = [new Item("Aged Brie", 2, 0)];
      const gildedRose = new GildedRose(items);

      gildedRose.updateQuality();

      expect(items[0].quality).toBe(1);
    });

    it("Aged Brie quality never more than 50", () => {
      const items = [new Item("Aged Brie", 2, 50)];
      const gildedRose = new GildedRose(items);

      gildedRose.updateQuality();

      expect(items[0].quality).toBe(50);
    });
  });

  describe("Sulfuras", () => {
    it("Sulfuras never changes", () => {
      const items = [new Item("Sulfuras, Hand of Ragnaros", 0, 80)];
      const gildedRose = new GildedRose(items);

      gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(0);
      expect(items[0].quality).toBe(80);
    });
  });

  describe("Backstage passes", () => {
    it("Backstage passes increases quality by 2 when 10 days or less", () => {
      const items = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
      ];
      const gildedRose = new GildedRose(items);

      gildedRose.updateQuality();

      expect(items[0].quality).toBe(22);
    });

    it("Backstage passes increases quality by 3 when 5 days or less", () => {
      const items = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
      ];
      const gildedRose = new GildedRose(items);

      gildedRose.updateQuality();

      expect(items[0].quality).toBe(23);
    });

    it("Backstage passes drop to 0 after concert", () => {
      const items = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
      ];
      const gildedRose = new GildedRose(items);

      gildedRose.updateQuality();

      expect(items[0].quality).toBe(0);
    });
  });

  describe("Conjured items", () => {
    it("conjured items degrade twice as fast as normal items", () => {
      const items = [new Item("Conjured Mana Cake", 10, 20)];
      const gildedRose = new GildedRose(items);

      gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(18);
    });

    it("conjured items degrade four times as fast after sell date", () => {
      const items = [new Item("Conjured Mana Cake", 0, 20)];
      const gildedRose = new GildedRose(items);

      gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(16);
    });

    it("conjured item quality never negative", () => {
      const items = [new Item("Conjured Mana Cake", 5, 1)];
      const gildedRose = new GildedRose(items);

      gildedRose.updateQuality();

      expect(items[0].quality).toBe(0);
    });
  });

  describe("ItemUpdaterFactory", () => {
    it("returns AgedBrieUpdater", () => {
      const item = new Item("Aged Brie", 10, 20);
      const updater = ItemUpdaterFactory.create(item);

      expect(updater).toBeInstanceOf(AgedBrieUpdater);
    });

    it("returns ConjuredUpdater", () => {
      const item = new Item("Conjured Mana Cake", 10, 20);
      const updater = ItemUpdaterFactory.create(item);

      expect(updater).toBeInstanceOf(ConjuredUpdater);
    });

    it("returns SulfurasUpdater", () => {
      const item = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
      const updater = ItemUpdaterFactory.create(item);

      expect(updater).toBeInstanceOf(SulfurasUpdater);
    });

    it("returns BackstageUpdater", () => {
      const item = new Item(
        "Backstage passes to a TAFKAL80ETC concert",
        10,
        20,
      );
      const updater = ItemUpdaterFactory.create(item);

      expect(updater).toBeInstanceOf(BackstageUpdater);
    });

    it("returns NormalItemUpdater by default", () => {
      const item = new Item("Random Item", 10, 20);
      const updater = ItemUpdaterFactory.create(item);

      expect(updater).toBeInstanceOf(NormalItemUpdater);
    });
  });
});
