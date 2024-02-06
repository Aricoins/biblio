import os from 'os';

function getLocalIP() {
    const netInterfaces = os.networkInterfaces();

    for (let interfaceName in netInterfaces ) {
        const netInterface = netInterfaces[interfaceName]

try {

        if (!netInterface) {
            continue;
        }
        for (let i = 0; i < netInterface.length; i++) {
            const addressInfo = netInterface[i];
            if (addressInfo.family === 'IPv4' && !addressInfo.internal) {
                return addressInfo.address;
            }
        }
        return 'localhost';
    }
    catch (e) {
        console.log(e);
    }
    }

   
}

export default getLocalIP;