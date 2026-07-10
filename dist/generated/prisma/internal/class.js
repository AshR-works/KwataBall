"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.8.0",
    "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
    "activeProvider": "postgresql",
    "inlineSchema": "generator client {\n  provider     = \"prisma-client\"\n  output       = \"../generated/prisma\"\n  moduleFormat = \"cjs\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nenum Role {\n  ADMIN\n  EDITOR\n  USER\n}\n\nmodel User {\n  id           String   @id @default(uuid())\n  email        String   @unique\n  passwordHash String\n  name         String\n  role         Role     @default(USER)\n  createdAt    DateTime @default(now())\n}\n\nmodel Team {\n  id          String   @id @default(uuid())\n  name        String   @db.VarChar(150)\n  shortName   String   @db.VarChar(10)\n  city        String?  @db.VarChar(100)\n  foundedYear Int?\n  logoUrl     String?  @db.VarChar(255)\n  externalId  String?  @unique @db.VarChar(100)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"passwordHash\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"enum\",\"type\":\"Role\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Team\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"shortName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"city\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"foundedYear\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"logoUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"externalId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"User.findUnique\",\"User.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"User.findFirst\",\"User.findFirstOrThrow\",\"User.findMany\",\"data\",\"User.createOne\",\"User.createMany\",\"User.createManyAndReturn\",\"User.updateOne\",\"User.updateMany\",\"User.updateManyAndReturn\",\"create\",\"update\",\"User.upsertOne\",\"User.deleteOne\",\"User.deleteMany\",\"having\",\"_count\",\"_min\",\"_max\",\"User.groupBy\",\"User.aggregate\",\"Team.findUnique\",\"Team.findUniqueOrThrow\",\"Team.findFirst\",\"Team.findFirstOrThrow\",\"Team.findMany\",\"Team.createOne\",\"Team.createMany\",\"Team.createManyAndReturn\",\"Team.updateOne\",\"Team.updateMany\",\"Team.updateManyAndReturn\",\"Team.upsertOne\",\"Team.deleteOne\",\"Team.deleteMany\",\"_avg\",\"_sum\",\"Team.groupBy\",\"Team.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"name\",\"shortName\",\"city\",\"foundedYear\",\"logoUrl\",\"externalId\",\"createdAt\",\"updatedAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"email\",\"passwordHash\",\"Role\",\"role\",\"set\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "WhMgCSwAAEsAMC0AAAQAEC4AAEsAMC8BAAAAATABAEMAITZAAEYAIUMBAAAAAUQBAEMAIUYAAExGIgEAAAABACABAAAAAQAgCSwAAEsAMC0AAAQAEC4AAEsAMC8BAEMAITABAEMAITZAAEYAIUMBAEMAIUQBAEMAIUYAAExGIgADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACAGLwEAAAABMAEAAAABNkAAAAABQwEAAAABRAEAAAABRgAAAEYCAQgAAAkAIAYvAQAAAAEwAQAAAAE2QAAAAAFDAQAAAAFEAQAAAAFGAAAARgIBCAAACwAwAQgAAAsAMAYvAQBTACEwAQBTACE2QABWACFDAQBTACFEAQBTACFGAABaRiICAAAAAQAgCAAADgAgBi8BAFMAITABAFMAITZAAFYAIUMBAFMAIUQBAFMAIUYAAFpGIgIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgAxUAAFcAIBYAAFkAIBcAAFgAIAksAABHADAtAAAXABAuAABHADAvAQA0ACEwAQA0ACE2QAA3ACFDAQA0ACFEAQA0ACFGAABIRiIDAAAABAAgAwAAFgAwFAAAFwAgAwAAAAQAIAMAAAUAMAQAAAEAIAwsAABCADAtAAAdABAuAABCADAvAQAAAAEwAQBDACExAQBDACEyAQBEACEzAgBFACE0AQBEACE1AQAAAAE2QABGACE3QABGACEBAAAAGgAgAQAAABoAIAwsAABCADAtAAAdABAuAABCADAvAQBDACEwAQBDACExAQBDACEyAQBEACEzAgBFACE0AQBEACE1AQBEACE2QABGACE3QABGACEEMgAATQAgMwAATQAgNAAATQAgNQAATQAgAwAAAB0AIAMAAB4AMAQAABoAIAMAAAAdACADAAAeADAEAAAaACADAAAAHQAgAwAAHgAwBAAAGgAgCS8BAAAAATABAAAAATEBAAAAATIBAAAAATMCAAAAATQBAAAAATUBAAAAATZAAAAAATdAAAAAAQEIAAAiACAJLwEAAAABMAEAAAABMQEAAAABMgEAAAABMwIAAAABNAEAAAABNQEAAAABNkAAAAABN0AAAAABAQgAACQAMAEIAAAkADAJLwEAUwAhMAEAUwAhMQEAUwAhMgEAVAAhMwIAVQAhNAEAVAAhNQEAVAAhNkAAVgAhN0AAVgAhAgAAABoAIAgAACcAIAkvAQBTACEwAQBTACExAQBTACEyAQBUACEzAgBVACE0AQBUACE1AQBUACE2QABWACE3QABWACECAAAAHQAgCAAAKQAgAgAAAB0AIAgAACkAIAMAAAAaACAPAAAiACAQAAAnACABAAAAGgAgAQAAAB0AIAkVAABOACAWAABRACAXAABQACAoAABPACApAABSACAyAABNACAzAABNACA0AABNACA1AABNACAMLAAAMwAwLQAAMAAQLgAAMwAwLwEANAAhMAEANAAhMQEANAAhMgEANQAhMwIANgAhNAEANQAhNQEANQAhNkAANwAhN0AANwAhAwAAAB0AIAMAAC8AMBQAADAAIAMAAAAdACADAAAeADAEAAAaACAMLAAAMwAwLQAAMAAQLgAAMwAwLwEANAAhMAEANAAhMQEANAAhMgEANQAhMwIANgAhNAEANQAhNQEANQAhNkAANwAhN0AANwAhDhUAADkAIBYAAEEAIBcAAEEAIDgBAAAAATkBAAAABDoBAAAABDsBAAAAATwBAAAAAT0BAAAAAT4BAAAAAT8BAEAAIUABAAAAAUEBAAAAAUIBAAAAAQ4VAAA8ACAWAAA_ACAXAAA_ACA4AQAAAAE5AQAAAAU6AQAAAAU7AQAAAAE8AQAAAAE9AQAAAAE-AQAAAAE_AQA-ACFAAQAAAAFBAQAAAAFCAQAAAAENFQAAPAAgFgAAPAAgFwAAPAAgKAAAPQAgKQAAPAAgOAIAAAABOQIAAAAFOgIAAAAFOwIAAAABPAIAAAABPQIAAAABPgIAAAABPwIAOwAhCxUAADkAIBYAADoAIBcAADoAIDhAAAAAATlAAAAABDpAAAAABDtAAAAAATxAAAAAAT1AAAAAAT5AAAAAAT9AADgAIQsVAAA5ACAWAAA6ACAXAAA6ACA4QAAAAAE5QAAAAAQ6QAAAAAQ7QAAAAAE8QAAAAAE9QAAAAAE-QAAAAAE_QAA4ACEIOAIAAAABOQIAAAAEOgIAAAAEOwIAAAABPAIAAAABPQIAAAABPgIAAAABPwIAOQAhCDhAAAAAATlAAAAABDpAAAAABDtAAAAAATxAAAAAAT1AAAAAAT5AAAAAAT9AADoAIQ0VAAA8ACAWAAA8ACAXAAA8ACAoAAA9ACApAAA8ACA4AgAAAAE5AgAAAAU6AgAAAAU7AgAAAAE8AgAAAAE9AgAAAAE-AgAAAAE_AgA7ACEIOAIAAAABOQIAAAAFOgIAAAAFOwIAAAABPAIAAAABPQIAAAABPgIAAAABPwIAPAAhCDgIAAAAATkIAAAABToIAAAABTsIAAAAATwIAAAAAT0IAAAAAT4IAAAAAT8IAD0AIQ4VAAA8ACAWAAA_ACAXAAA_ACA4AQAAAAE5AQAAAAU6AQAAAAU7AQAAAAE8AQAAAAE9AQAAAAE-AQAAAAE_AQA-ACFAAQAAAAFBAQAAAAFCAQAAAAELOAEAAAABOQEAAAAFOgEAAAAFOwEAAAABPAEAAAABPQEAAAABPgEAAAABPwEAPwAhQAEAAAABQQEAAAABQgEAAAABDhUAADkAIBYAAEEAIBcAAEEAIDgBAAAAATkBAAAABDoBAAAABDsBAAAAATwBAAAAAT0BAAAAAT4BAAAAAT8BAEAAIUABAAAAAUEBAAAAAUIBAAAAAQs4AQAAAAE5AQAAAAQ6AQAAAAQ7AQAAAAE8AQAAAAE9AQAAAAE-AQAAAAE_AQBBACFAAQAAAAFBAQAAAAFCAQAAAAEMLAAAQgAwLQAAHQAQLgAAQgAwLwEAQwAhMAEAQwAhMQEAQwAhMgEARAAhMwIARQAhNAEARAAhNQEARAAhNkAARgAhN0AARgAhCzgBAAAAATkBAAAABDoBAAAABDsBAAAAATwBAAAAAT0BAAAAAT4BAAAAAT8BAEEAIUABAAAAAUEBAAAAAUIBAAAAAQs4AQAAAAE5AQAAAAU6AQAAAAU7AQAAAAE8AQAAAAE9AQAAAAE-AQAAAAE_AQA_ACFAAQAAAAFBAQAAAAFCAQAAAAEIOAIAAAABOQIAAAAFOgIAAAAFOwIAAAABPAIAAAABPQIAAAABPgIAAAABPwIAPAAhCDhAAAAAATlAAAAABDpAAAAABDtAAAAAATxAAAAAAT1AAAAAAT5AAAAAAT9AADoAIQksAABHADAtAAAXABAuAABHADAvAQA0ACEwAQA0ACE2QAA3ACFDAQA0ACFEAQA0ACFGAABIRiIHFQAAOQAgFgAASgAgFwAASgAgOAAAAEYCOQAAAEYIOgAAAEYIPwAASUYiBxUAADkAIBYAAEoAIBcAAEoAIDgAAABGAjkAAABGCDoAAABGCD8AAElGIgQ4AAAARgI5AAAARgg6AAAARgg_AABKRiIJLAAASwAwLQAABAAQLgAASwAwLwEAQwAhMAEAQwAhNkAARgAhQwEAQwAhRAEAQwAhRgAATEYiBDgAAABGAjkAAABGCDoAAABGCD8AAEpGIgAAAAAAAAFHAQAAAAEBRwEAAAABBUcCAAAAAUgCAAAAAUkCAAAAAUoCAAAAAUsCAAAAAQFHQAAAAAEAAAABRwAAAEYCAAAAAAMVAAYWAAcXAAgAAAADFQAGFgAHFwAIAAAABRUADhYAERcAEigADykAEAAAAAAABRUADhYAERcAEigADykAEAECAQIDAQUGAQYHAQcIAQkKAQoMAgsNAwwPAQ0RAg4SBBETARIUARMVAhgYBRkZCRobChscChwfCh0gCh4hCh8jCiAlAiEmCyIoCiMqAiQrDCUsCiYtCicuAioxDSsyEw"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.js"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.js");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map