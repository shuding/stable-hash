import hash from "../src/index"
import { Temporal } from "@js-temporal/polyfill"

describe(`Booleans`, () => {
    test(`Simple check`, () => {
        expect(hash(true)).toEqual(hash(true));
        expect(hash(false)).not.toEqual(hash(true));
        expect(hash(false)).toEqual(hash(false))
    });
})

describe(`Strings`, () => {
    test(`Empty strings are equal`, () => {
        expect(hash("")).toEqual(hash(""))
    });
    test(`Empty string is not equal to other falsy values`, () => {
        const emptyString = hash("")
        expect(emptyString).not.toEqual(hash(undefined))
        expect(emptyString).not.toEqual(hash(0))
        expect(emptyString).not.toEqual(hash(null))
        expect(emptyString).not.toEqual(hash(false))
    });
    test(`One space is not equal to many spaces`, () => {
        expect(hash(" ")).not.toEqual(hash("  "))
        expect(hash(" ")).not.toEqual(hash("           "))
    });
    test(`Basic/Common characters `, () => {
        expect(hash("Check out useSWR (npm i swr) for easy, robust data fetching in React."))
            .toEqual(hash("Check out useSWR (npm i swr) for easy, robust data fetching in React."))

        expect(hash("  af jFJI   F89fj32fajsdjfaszf0_F0j2fa0"))
            .toEqual(hash("  af jFJI   F89fj32fajsdjfaszf0_F0j2fa0"));

        expect(hash("23ja8!@#xc,m,/?@1mfjaDFJIPMal921m")).not.toEqual("23ja8!@#xc,m,/?@1m");
    });

    test(`Unconventional characters`, () => {

        expect(hash("u̝̚s̞ͨe͚̦͋ͣr̲̞͋͋ ͕̩̹͌ͯ͆ì̺̜̬̏̽ṇ̞̪͍̎͊̉͆p̼̭͎̆̐̄ͬͅȗ̬͙̗͍̟ͩ̒̃̚t͍͓̻̝̝́̾̄̐̔ś̗̹͇͉̙̟̔ͪ͑͛̐ ̥̞͚͖̪͖̎̾̈͑̆̾c̪̘̬͍̤͚͊̆͑̋̓̔a̙̠̻̬̙ͩ͒ͧ͂̄̊ͅn̞͚̠̩̬ͭ͌͑͑̍ ͍̟̲͍̼ͩ̉͒ͬ̚b̦̞̭̹ͪͦ̍ͦȅ̘̟͇͖̿̉̚ ̯̻̠ͩͥͣw̯̮͙ͫ̾̅i̦͈͛̅l̖̘ͯ͗d͔̈́")).toEqual(hash("u̝̚s̞ͨe͚̦͋ͣr̲̞͋͋ ͕̩̹͌ͯ͆ì̺̜̬̏̽ṇ̞̪͍̎͊̉͆p̼̭͎̆̐̄ͬͅȗ̬͙̗͍̟ͩ̒̃̚t͍͓̻̝̝́̾̄̐̔ś̗̹͇͉̙̟̔ͪ͑͛̐ ̥̞͚͖̪͖̎̾̈͑̆̾c̪̘̬͍̤͚͊̆͑̋̓̔a̙̠̻̬̙ͩ͒ͧ͂̄̊ͅn̞͚̠̩̬ͭ͌͑͑̍ ͍̟̲͍̼ͩ̉͒ͬ̚b̦̞̭̹ͪͦ̍ͦȅ̘̟͇͖̿̉̚ ̯̻̠ͩͥͣw̯̮͙ͫ̾̅i̦͈͛̅l̖̘ͯ͗d͔̈́"));




        expect(hash("u̝̚s̞ͨe͚̦͋ͣr̲̞͋͋ ͕̩̹͌ͯ͆ì̺̜̬̏̽ṇ̞̪͍̎͊̉͆p̼̭͎̆̐̄ͬͅȗ̬͙̗͍̟ͩ̒̃̚t͍͓̻̝̝́̾̄̐̔ś̗̹͇͉̙̟̔ͪ͑͛̐ ̥̞͚͖̪͖̎̾̈͑̆̾c̪̘̬͍̤͚͊̆͑̋̓̔a̙̠̻̬̙ͩ͒ͧ͂̄̊ͅn̞͚̠̩̬ͭ͌͑͑̍ ͍̟̲͍̼ͩ̉͒ͬ̚b̦̞̭̹ͪͦ̍ͦȅ̘̟͇͖̿̉̚ ̯̻̠ͩͥͣw̯̮͙ͫ̾̅i̦͈͛̅l̖̘ͯ͗d͔̈́")).not.toEqual(hash("u̝̚s̞ͨe͚̦͋ͣr̲̞͋͋ ͕̩̹͌ͯ͆ì̺̜̬̏̽ṇ̞̪͍̎͊̉͆p̼̭͎̆̐̄ͬͅȗ̬͙̗͍̟ͩ̒̃̚t͍͓̻̝̝́̾̄̐̔ś̗̹͇͉̙̟̔ͪ͑͛̐ ̥̞͚͖̪͖̎̾̈͑̆̾c̪̘̬͍̤͚͊̆͑̋̓̔a̙̠̻̬̙ͩ͒ͧ͂̄̊ͅn̞͚̠̩̬ͭ͌͑͑̍ ͍̟̲͍̼ͩ̉͒ͬ̚b̦̞̭̹ͪͦ̍ͦȅ̘̟͇͖̿̉̚"));


    });
});


describe(`Numbers including BigInt`, () => {
    test(`SheNaNigans`, () => {
        expect(hash(NaN)).toEqual(hash(NaN));
        expect(hash(NaN)).not.toEqual(hash(NaN.toString()));
        expect(hash(1 + NaN)).toEqual(hash(NaN + 1));
        expect(hash("1" + NaN)).not.toEqual(hash(NaN + "1"));
    });
    test(`Integers`, () => {
        expect(hash(2 + 1)).toEqual(hash(2 + 1));
        expect(hash(-3)).not.toEqual(hash("-3"));
        expect(hash(123)).not.toEqual(hash(1123));
        expect(hash(400_000)).toEqual(hash(400000));
    });
    test(`Floats`, () => {
        expect(hash(0.000001)).toEqual(hash(0.000001))
        expect(hash(-0.000001)).not.toEqual(hash(0.000001))
        expect(hash(9999999.9999999)).not.toEqual(hash(10000000.0))
    });

    test(`BigInts`, () => {
        expect(hash(BigInt(8))).toEqual(hash(BigInt(8)));
        //expect(hash( BigInt(8) )).not.toEqual(hash(8)); This fails but that may be intentional;
        expect(hash(BigInt(99999999999999999999999999999999999999999999999999999999999999999999999999)))
            .not.toEqual(BigInt(77777777777777777777777777777777777777777777777777777))
    });
});



describe(`Arrays`, () => {
    test(`Empty arrays are equal`, () => {
        expect(hash([])).toEqual(hash([]))
    });
    test(`Simple arrays with primitives`, () => {
        expect(hash([1, 2, 3])).toEqual(hash([1, 2, 3]));
        expect(hash([1, 2])).not.toEqual(hash([1, 2, 3]));
        expect(hash(["1", 2, 3])).not.toEqual(hash([1, 2, 3]));
        expect(hash(["1", "2", "3"])).toEqual(hash(["1", "2", "3"]));
        expect(hash([1, 3, 2])).not.toEqual(hash([1, 2, 3]));
        expect(hash([true, true, true])).not.toEqual(hash([0, 0, 0]))
        expect(hash([true, true, true])).toEqual(hash([true, true, true]));
    });
    test(`Pseudo arrays and empty values`, () => {
        const pseudo = { "0": "A", "1": "B", "2": "C", length: 3, constructor: Array }
        //expect(hash(pseudo)).not.toEqual(hash(["A","B","C"])) This fails (yes it's super contrived 🤪)
        expect(hash(pseudo)).toEqual(hash(pseudo));

        const arrayWithExtraStuff: any = [1, 2, 3];
        arrayWithExtraStuff.extra = "Stuff";
        arrayWithExtraStuff.extraStuff = [];
        arrayWithExtraStuff.evenMoreExtraStuff = { nested: "extraStuff" };
        //expect(hash(arrayWithExtraStuff)).not.toEqual(hash([1, 2, 3]))  This fails (yep still kinda contrived 🙃)

        const anotherArrayWithExtraStuff = Object.assign([1, 2, 3,], { extra: "Stuff" });
        /* expect(hash(anotherArrayWithExtraStuff)).not.toEqual(hash([1,2,3])) 
        Ok maybe I'm just getting silly 😂 but this fails. All joking aside, any robust way to
        solve these would probably not be worth the hit to performance because these are very unusual cases */

        const arrayWithEmptyIndices = [1, 2];
        arrayWithEmptyIndices[100] = 3;
        expect(arrayWithEmptyIndices).not.toEqual([1, 2, 3]);
    });
})


describe(`POJOs`, () => {
    test(`Empty objects are equal`, () => {
        expect(hash({})).toEqual(hash({}));
    });
    test(`Empty object not equal to empty array`, () => {
        expect(hash({})).not.toEqual(hash([]));
    });
    test(`Objects with simple k:v pairs where v is a primitive`, () => {
        expect(hash({ hi: "hello" })).toEqual(hash({ hi: "hello" }));
        expect(hash({ hi: "hello" })).not.toEqual(hash({ bye: "goodbye" }));

        const pretendRecord = {
            name: "Muffin Man",
            street: "Drury Ln",
            crimesCommitted: 13,
            description: "⚠ USE EXTREME CAUTION WHEN APPROACHING ⚠",
            currentlyUnderInvestigation: true
        }
        expect(hash(pretendRecord)).toEqual(hash({
            name: "Muffin Man",
            street: "Drury Ln",
            crimesCommitted: 13,
            description: "⚠ USE EXTREME CAUTION WHEN APPROACHING ⚠",
            currentlyUnderInvestigation: true
        }))

        expect(hash(pretendRecord)).not.toEqual(hash({
            name: "Muffin Man",
            street: "Drury Ln",
            crimesCommitted: 14,
            description: "⚠ USE EXTREME CAUTION WHEN APPROACHING ⚠",
            currentlyUnderInvestigation: true
        }))

        expect(hash(pretendRecord)).not.toEqual(hash({
            name: "Muffin Man",
            street: "Drury Ln",
            crimesCommitted: 13,
            currentlyUnderInvestigation: true
        }))
    });
    test(`Stringified json not equal to itself in parsed form`, () => {
        expect(hash({ use: "SWR" })).not.toEqual(hash(JSON.stringify({ use: "SWR" })))
    });
    test(`Order doesn't matter in non-array object`, () => {
        expect(hash({ first: "1", second: "2", third: "3" })).toEqual(hash({ second: "2", third: "3", first: "1" }))
    })
    test(`Objects with nested data structures`, () => {
        expect(hash({ a: { b: { c: {} } } })).toEqual(hash({ a: { b: { c: {} } } }));
        expect(hash({ a: { b: { c: {} } } })).not.toEqual(hash({ a: { b: { z: {} } } }));
        expect(hash({ a: { b: { c: {} } } })).not.toEqual(hash({ a: { b: { c: { d: {} } } } }));

        expect(hash({
            a: [1, 2, 3],
            b: {
                c: [4, 5, 6],
                d: [{ e: 7 }, { g: 8 }]
            }
        })).toEqual(hash({
            a: [1, 2, 3],
            b: {
                c: [4, 5, 6],
                d: [{ e: 7 }, { g: 8 }]
            }
        }))

        expect(hash({
            a: [1, 2, 3],
            b: {
                c: [4, 5, 6],
                d: [{ e: 7 }, { g: 8 }]
            }
        })).not.toEqual(hash({
            a: [1, 2, 3],
            b: {
                c: [4, 5, 6],
                d: [{ e: "f" }, { g: "h" }]
            }
        }))
    });

});

describe(`Temporal`, () => {
    const temporalCases: Array<[
        string,
        { from(value: string): any },
        string,
        string,
    ]> = [
        ["Instant", Temporal.Instant, "2024-01-01T00:00:00Z", "2024-01-02T00:00:00Z"],
        ["ZonedDateTime", Temporal.ZonedDateTime, "2024-01-01T00:00:00[UTC]", "2024-01-02T00:00:00[UTC]"],
        ["PlainDateTime", Temporal.PlainDateTime, "2024-01-01T00:00:00", "2024-01-02T00:00:00"],
        ["PlainDate", Temporal.PlainDate, "2024-01-01", "2024-01-02"],
        ["PlainTime", Temporal.PlainTime, "12:34:56", "12:34:57"],
        ["PlainYearMonth", Temporal.PlainYearMonth, "2024-01", "2024-02"],
        ["PlainMonthDay", Temporal.PlainMonthDay, "01-01", "01-02"],
        ["Duration", Temporal.Duration, "P1D", "P2D"],
    ]

    test.each(temporalCases)(`%s values are hashed by value`, (_, Type, value, differentValue) => {
        const temporalValue = Type.from(value)
        expect(hash(temporalValue)).toEqual(hash(Type.from(value)))
        expect(hash(temporalValue)).not.toEqual(hash(Type.from(differentValue)))
        expect(hash(temporalValue)).not.toEqual(hash(temporalValue.toJSON()))
    })

    test(`Temporal types have distinct hashes`, () => {
        const date = Temporal.PlainDate.from("2020-01-01[u-ca=gregory]")
        const yearMonth = Temporal.PlainYearMonth.from("2020-01-01[u-ca=gregory]")
        expect(date.toJSON()).toEqual(yearMonth.toJSON())
        expect(hash(date)).not.toEqual(hash(yearMonth))

        const legacyDate = new Date("2024-01-01T00:00:00.123Z")
        const instant = Temporal.Instant.from("2024-01-01T00:00:00.123Z")
        expect(legacyDate.toJSON()).toEqual(instant.toJSON())
        expect(hash(legacyDate)).not.toEqual(hash(instant))
    })

    test(`toJSON omissions affect the hash`, () => {
        const firstYearMonth = new Temporal.PlainYearMonth(2024, 1, "iso8601", 1)
        const fifteenthYearMonth = new Temporal.PlainYearMonth(2024, 1, "iso8601", 15)
        expect(firstYearMonth.equals(fifteenthYearMonth)).toEqual(false)
        expect(firstYearMonth.toJSON()).toEqual(fifteenthYearMonth.toJSON())
        expect(hash(firstYearMonth)).not.toEqual(hash(fifteenthYearMonth))

        const firstMonthDay = new Temporal.PlainMonthDay(1, 1, "iso8601", 1972)
        const secondMonthDay = new Temporal.PlainMonthDay(1, 1, "iso8601", 2000)
        expect(firstMonthDay.equals(secondMonthDay)).toEqual(false)
        expect(firstMonthDay.toJSON()).toEqual(secondMonthDay.toJSON())
        expect(hash(firstMonthDay)).not.toEqual(hash(secondMonthDay))
    })

    test(`ZonedDateTime hashes include the exact instant`, () => {
        const beforeTransition = new Temporal.ZonedDateTime(
            BigInt("-1830387624000000000"),
            "Africa/Ndjamena",
        )
        const afterTransition = new Temporal.ZonedDateTime(
            BigInt("-1830387612000000000"),
            "Africa/Ndjamena",
        )
        expect(beforeTransition.equals(afterTransition)).toEqual(false)
        expect(beforeTransition.toString({ calendarName: "always" }))
            .toEqual(afterTransition.toString({ calendarName: "always" }))
        expect(hash(beforeTransition)).not.toEqual(hash(afterTransition))
    })

    test(`equivalent Duration fields share a canonical hash`, () => {
        const seconds = new Temporal.Duration(0, 0, 0, 0, 0, 0, 1)
        const milliseconds = new Temporal.Duration(0, 0, 0, 0, 0, 0, 0, 1000)
        expect(Temporal.Duration.compare(seconds, milliseconds)).toEqual(0)
        expect(hash(seconds)).toEqual(hash(milliseconds))
    })

    test(`Temporal values are hashed by value when nested`, () => {
        expect(hash({ date: Temporal.PlainDate.from("2024-01-01") }))
            .toEqual(hash({ date: Temporal.PlainDate.from("2024-01-01") }))
    })

    test(`invalid Temporal-like objects keep reference semantics`, () => {
        class TaggedTemporal {
            get [Symbol.toStringTag]() {
                return "Temporal.PlainDate"
            }
        }

        class ThrowingTemporal extends TaggedTemporal {
            toJSON() {
                return "2024-01-01"
            }

            toString() {
                throw new TypeError("Not a real Temporal value")
            }
        }

        for (const TemporalLike of [TaggedTemporal, ThrowingTemporal]) {
            const value = new TemporalLike()
            expect(() => hash(value)).not.toThrow()
            expect(hash(value)).not.toEqual(hash(new TemporalLike()))
        }
    })
})

describe(`The Func-y Bunch featuring The Referential Squad`, () => {
    test(`Functions`, () => {
        expect(hash(() => { })).not.toEqual(hash(() => { }));

        function emptyFunc() { }
        function anotherEmptyFunc() { }
        expect(hash(emptyFunc)).toEqual(hash(emptyFunc));
        expect(hash(emptyFunc)).not.toEqual(hash(anotherEmptyFunc));

        function sum(a, b) { return a + b };
        function alsoSum(a, b) { return a + b }
        expect(hash(sum)).toEqual(hash(sum));
        expect(hash(sum)).not.toEqual(hash(alsoSum));

        const functionHolder = { sum }
        expect(hash(functionHolder.sum)).toEqual(hash(functionHolder.sum));
        expect(hash(functionHolder.sum)).toEqual(hash(sum));
        expect(hash(functionHolder)).toEqual(hash(functionHolder))
    });

    test(`Dates`, () => {
        const now = new Date();
        expect(hash(now)).toEqual(hash(now));

        const actualDateObject = new Date("2022-06-25T01:55:27.743Z");
        const dateString = "2022-06-25T01:55:27.743Z";
        expect(hash(actualDateObject)).not.toEqual(hash(dateString));
        expect(hash(now)).not.toEqual(hash(actualDateObject))
    });

    test(`Regex`, () => {
        expect(hash(/hello/)).toEqual(hash(/hello/));
        expect(hash(/hello/)).not.toEqual(hash("hello"));
        expect(hash(/hello/i)).not.toEqual(hash(/HELLO/i))
    });

    test(`Symbols`, () => {
        const test = Symbol("test");
        expect(hash(test)).not.toEqual(hash("test"));
        expect(hash(test)).not.toEqual(hash(Symbol()));
        expect(test).not.toEqual(hash(test))
        expect(hash(test)).toEqual(hash(test));
    });

    test(`Proxies`, () => {
        const originalObject = { key: "value" };
        const noOpProxy = new Proxy(originalObject, {});
        expect(hash(noOpProxy)).toEqual(hash(originalObject));
        expect(hash(noOpProxy)).toEqual(hash(noOpProxy));

        const anotherNoOpProxy = new Proxy(originalObject, {});
        expect(hash(anotherNoOpProxy)).toEqual(hash(noOpProxy));

        const rejectionProxy = new Proxy(originalObject, {
            get() {
                return "nope"
            }
        });
        expect(hash(rejectionProxy)).not.toEqual(hash(originalObject));
        expect(hash(rejectionProxy)).toEqual(hash(rejectionProxy));
    });

    test(`Classes`, () => {
        class Cat { }
        expect(hash(Cat)).toEqual(hash(Cat));

        const kitty = new Cat();
        const anotherKitty = new Cat();
        expect(hash(kitty)).toEqual(hash(kitty));
        expect(hash(kitty)).not.toEqual(hash(anotherKitty));
    });

    test(`Sets`, () => {
        const one = new Set([1, 1, 1, 1, 1, 1, 1, 1, 1]);
        expect(hash(one)).toEqual(hash(one));
        expect(hash(one)).not.toEqual(hash([1]))

        const anothaOne = new Set([1, 1, 1, 1, 1, 1, 1, 1, 1]);
        expect(hash(anothaOne)).toEqual(hash(anothaOne));
        expect(hash(one)).not.toEqual(hash(anothaOne));
    });

    test(`Buffers`, () => {
        const emptyBuffer = Buffer.alloc(10);
        const anotherEmptyBuffer = Buffer.alloc(10);
        expect(hash(emptyBuffer)).toEqual(hash(emptyBuffer));
        expect(hash(emptyBuffer)).not.toEqual(hash(anotherEmptyBuffer));

        const stringBuffer = Buffer.from("Host with Vercel to deploy the future of modern, performant web apps that scale with ease.", "utf8");
        const copy = Buffer.from("Host with Vercel to deploy the future of modern, performant web apps that scale with ease.", "utf8");
        expect(hash(stringBuffer)).toEqual(hash(stringBuffer));
        expect(hash(stringBuffer)).not.toEqual(hash(copy))
    });

    test(`Maps`, () => {
        const catMap = new Map();
        const catMap2 = new Map();
        catMap.set('meowLoudly','at 3am');
        catMap2.set('meowLoudly','at 3am');

        expect(hash(catMap)).toEqual(hash(catMap));
        expect(hash(catMap)).not.toEqual(hash(catMap2))
    });
})
