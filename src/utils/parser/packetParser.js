import { config } from "../../config/config.js";
import { getProtoTypeNameByHandlerId } from "../../handler/index.js";
import { getProtoMessages } from "../../init/loadProtos.js"

export const packetParser = (data) =>{
    const protoMessages = getProtoMessages();

    const commonPacket = protoMessages.common.Packet;
    let packet;
    try{
        packet = commonPacket.decode(data);
    }catch(err){
        console.error(err);
    }

    const handlerId = packet.handlerId;
    const userId = packet.userId;
    const clientVersion = packet.version;

    if(config.client.version !== clientVersion)
    {
        throw Error();
    }

    const protoTypeName = getProtoTypeNameByHandlerId(handlerId);

    if(!protoTypeName){
        throw Error();
    }

    const [ namespace, typeName ] = protoTypeName.split('.');
    const payloadType = protoMessages[namespace][typeName];
    let payload;

    try{
        payload = payloadType.decode(packet.payload);
    }catch(err)
    {
        console.error(err);
    }

    const expectedFields = Object.keys(payloadType.fields);
    const actualFields = Object.keys(payload);
    const missingFields = expectedFields.filter((field) => !actualFields.includes(field));

    if(missingFields.length > 0){
        throw Error();
    }

    return { handlerId , userId, payload };
};