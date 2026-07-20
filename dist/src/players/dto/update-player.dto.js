"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlayerDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_player_dto_1 = require("./create-player.dto");
class UpdatePlayerDto extends (0, mapped_types_1.PartialType)(create_player_dto_1.CreatePlayerDto) {
}
exports.UpdatePlayerDto = UpdatePlayerDto;
//# sourceMappingURL=update-player.dto.js.map