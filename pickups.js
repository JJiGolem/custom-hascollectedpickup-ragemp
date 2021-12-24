const intervalMs = 100;
const natives = {
  CreatePickup: "0xFBA08C503DD5FA58",
  DoesPickupExist: "0xAFC1CA75AD4074D1",
  GetPickupObject: "0x5099BC55630B25AE",
  RemovePickup: "0x3288D8ACAECD2AB2"
};

async function createPickup(pickupHash, position, p4, value, p6, modelHash, timeOutMs = 10000) {
  const {
    x,
    y,
    z
  } = position;
  let pickup = mp.game2.invoke(natives.CreatePickup, pickupHash, x, y, z, p4, value, p6, modelHash);

  while (mp.game2.invoke(natives.GetPickupObject, pickup) == -1) {
    await mp.game.waitAsync(100);
  }

  let tempMs = 0;
  let checkInterval = setInterval(() => {
    if (pickup) {
      if (mp.game2.invoke(natives.DoesPickupExist, pickup)) {
        let pickupObject = mp.game2.invoke(natives.GetPickupObject, pickup);
        if (pickupObject == -1) {
          // collected
          mp.gui.chat.push(`${pickup} collected`);
          mp.game2.invoke(natives.RemovePickup, pickup);
          clearInterval(checkInterval);
        } else {
          // not collected
        }
      }
    }

    if (tempMs > timeOutMs) {
      mp.game2.invoke(natives.RemovePickup, pickup);
      clearInterval(checkInterval);
      mp.gui.chat.push(`pickup (${pickup}) timeouted`);
    }

    tempMs += intervalMs;
  }, intervalMs);
}

mp.events.add("createPickups", () => {
  createPickup(-1888453608, new mp.Vector3(2011.8097, 3068.217, 45.94052), 250, 1, true, mp.game.joaat('prop_ld_health_pack'), 5000);
  createPickup(-1888453608, new mp.Vector3(2003.8634, 3070.6514, 45.929794), 250, 1, true, mp.game.joaat('prop_ld_health_pack'), 10000);
  createPickup(-1888453608, new mp.Vector3(2000.5026, 3079.1162, 45.941517), 250, 1, true, mp.game.joaat('prop_ld_health_pack'), 15000);
  createPickup(-1888453608, new mp.Vector3(1992.6583, 3073.231, 45.917873), 250, 1, true, mp.game.joaat('prop_ld_health_pack'), 20000);
  createPickup(-1888453608, new mp.Vector3(1991.2749, 3066.181, 45.910202), 250, 1, true, mp.game.joaat('prop_ld_health_pack'), 25000);
  createPickup(-1888453608, new mp.Vector3(1982.7778, 3069.477, 45.851837), 250, 1, true, mp.game.joaat('prop_ld_health_pack'), 30000);
});