const localeFunc = (_, index) =>
  [
    ['juuri nyt', 'juuri nyt'],
    ['%s sekuntia sitten', '%s sekunnissa'],
    ['1 minuutti sitten', 'minuutissa'],
    ['%s minuuttia sitten', '%s minuutissa'],
    ['1 tunti sitten', 'tunnissa'],
    ['%s tuntia sitten', '%s tunnissa'],
    ['1 päivä sitten', 'päivässä'],
    ['%s päivää sitten', '%s päivässä'],
    ['1 viikko sitten', 'viikossa'],
    ['%s viikkoa sitten', '%s viikossa'],
    ['1 kuukausi sitten', 'kuukaudessa'],
    ['%s kuukautta sitten', '%s kuukaudessa'],
    ['1 vuosi sitten', 'vuodessa'],
    ['%s vuotta sitten', '%s vuodessa']
  ][index];

export default localeFunc;
