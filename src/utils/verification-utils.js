import {verifyCredential, downloadRevocationList} from "@sunbird-rc/verification-sdk";
import {resolveDid} from "./did-utils";

let revocationList = [];

const verify = async (credential) => {
    let resolutionResult = await resolveDid(credential?.proof?.verificationMethod);
    if (resolutionResult.didResolutionMetadata.error) {
        throw new Error(resolutionResult.didResolutionMetadata.error)
    }
    let issuerDID = resolutionResult.didDocument;
    let revocationUrl = "https://dristi-dev.digit.org/credentials-service/credentials/revocation-list";
    revocationList = await downloadRevocationList(revocationUrl,issuerDID.id);
    console.log(revocationList);
    return  await verifyCredential(issuerDID, credential, revocationList);
}

export {verify};
