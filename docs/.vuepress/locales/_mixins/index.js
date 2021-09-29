const fs = require('fs');
const path = require('path');

const getRawIcon = (relativePath) => {
    return fs.readFileSync(path.resolve(__dirname, relativePath)).toString()
};

module.exports = {
    backToIndexButtonText: 'Back to index',
    sidebarOnThisPageText: 'On this page',

    languageAbsenceNotification: {
        title: 'Oops…',
        message: 'The content of this page is currently unavailable.<br>Sorry for the inconvenience!',
    },

    notFoundPage: {
        title: 'Something’s missing',
        description: 'The page you are looking for is not found',
    },

    homePage: {
        technologyList: {
            learnAboutWavesPlatform: {
                rootLink: '/en/blockchain/',
                type: 'beginner',
                iconFilePath: getRawIcon('./images/category1.svg'),
                buttonSet: {
                    account: {
                        text: 'Account',
                        link: '/en/blockchain/account/'
                    },
                    token: {
                        text: 'Tokens',
                        link: '/en/blockchain/token/'
                    },
                    mining: {
                        text: 'Mining',
                        link: '/en/blockchain/mining/'
                    },
                    transaction: {
                        text: 'Transactions',
                        link: '/en/blockchain/transaction/'
                    }
                }
            },
            buildingBlockchainApps: {
                rootLink: '/en/building-apps/',
                type: 'advanced',
                iconFilePath: getRawIcon('./images/rocket.svg'),
                buttonSet: {
                    dapp: {
                        text: 'dApps',
                        link: '/en/building-apps/smart-contracts/what-is-a-dapp'
                    },
                    smartAsset: {
                        text: 'Smart assets',
                        link: '/en/building-apps/smart-contracts/what-is-smart-asset'
                    },
                    signer: {
                        text: 'Signer',
                        link: '/en/building-apps/waves-api-and-sdk/client-libraries/signer'
                    },
                    howTo: {
                        text: 'How-to guides',
                        link: '/en/building-apps/how-to/'
                    },
                    dataService: {
                        text: 'Data Service API',
                        link: '/en/building-apps/waves-api-and-sdk/waves-data-service-api'
                    },
                }
            },
            rideProgrammingLanguage: {
                rootLink: '/en/ride/',
                type: 'advanced',
                iconFilePath: getRawIcon('./images/category5.svg'),
                buttonSet: {
                    gettingStarted: {
                        text: 'Getting started',
                        link: '/en/ride/getting-started'
                    },
                    scriptTypes: {
                        text: 'Script types',
                        link: '/en/ride/script/'
                    },
                    callableFunction: {
                        text: 'Callable function',
                        link: '/en/ride/functions/callable-function'
                    },
                },

            },
            node: {
                rootLink: '/en/waves-node/',
                type: 'advanced',
                iconFilePath: getRawIcon('./images/category2.svg'),
                buttonSet: {
                    launch: {
                        text: 'Launch a node',
                        link: '/en/waves-node/how-to-install-a-node/how-to-install-a-node',
                    },
                    grpc: {
                        text: 'gRPC server',
                        link: '/en/waves-node/extensions/grpc-server/',
                    },
                    nodeApi: {
                        text: 'Node REST API',
                        link: '/en/waves-node/node-api/',
                    },
                },
            },
            ecosystemApplications: {
                rootLink: '/en/ecosystem/',
                type: 'beginner',
                iconFilePath: getRawIcon('./images/category3.svg'),
                buttonSet: {
                    explorer: {
                        text: 'Explorer',
                        link: '/en/ecosystem/waves-explorer/about-waves-explorer',
                    },
                    faucet: {
                        text: 'Free Waves on Testnet',
                        link: '/en/ecosystem/waves-explorer/account-balance-top-up-in-the-test-network',
                    },
                    keeper: {
                        text: 'Waves Keeper',
                        link: '/en/ecosystem/waves-keeper/',
                    },
                },
            },
            miscellaneous: {
                rootLink: '/en/keep-in-touch/',
                type: 'supplementary',
                iconFilePath: getRawIcon('./images/category7.svg'),
                buttonSet: {
                    blog: {
                        text: 'Official blog',
                        link: 'https://medium.com/wavesprotocol',
                    },
                    forum: {
                        text: 'Forum',
                        link: 'https://forum.waves.tech',
                    },
                    chat: {
                        text: 'Developer chat',
                        link: 'https://t.me/waves_ride_dapps_dev'
                    },
                    release_notes: {
                        text: 'Release notes',
                        link: '/en/keep-in-touch/release-notes'
                    },                    
                },
            }
        },
    },

    searchPopup: {
        cancelText: 'Cancel',
        resultsMatchingText: 'results matching',
        showMoreText: 'Show more',
        minQueryLength: 4,
        limitationQueryText: 'A search query can be a minimum of 4 characters',
        noSuchResults: 'No such results',
    },

    footer: {
        broughtToYouByWavesTeam: 'Brought to you by Waves Team.',
        copyright: '© 2019—2021 Waves Technologies',
        email: '',
        resourcesCategories: {
            about: {
                title: 'About',
                links: {
                    wavesBlockchain: {
                        title: 'Waves Tech',
                        link: 'https://waves.tech',
                    },
                    blog: {
                        title: 'Blog',
                        link: 'https://medium.com/wavesprotocol',
                    },
                    forum: {
                        title: 'Forum',
                        link: 'https://forum.waves.tech',
                    },
                    social: {
                        title: 'Socials',
                        link: 'https://docs.waves.tech/en/keep-in-touch/',
                    },

                },
            }, 
            forDevelopers: {
                title: 'Develop',
                links: {
                    web3Course: {
                        title: 'Web3 Course',
                        link: 'https://www.coursera.org/learn/mastering-web3-waves',
                    },
                    gitHub: {
                        title: 'GitHub',
                        link: 'https://github.com/wavesplatform',
                    },
                    chat: {
                        title: 'Developer chat',
                        link: 'https://t.me/waves_ride_dapps_dev'
                    },
                },
            },
            productsAndTools: {
                title: 'Tools',
                links: {
                    wavesExplorer: {
                        title: 'Waves Explorer',
                        link: 'https://wavesexplorer.com/',
                    },
                    WavesIde: {
                        title: 'Waves IDE',
                        link: 'https://waves-ide.com/',
                    },
                    wavesKeeper: {
                        title: 'Waves Keeper',
                        link: 'https://docs.waves.tech/en/ecosystem/waves-keeper/',
                    },
                    wavesSigner: {
                        title: 'Waves Signer',
                        link: 'https://docs.waves.tech/en/building-apps/waves-api-and-sdk/client-libraries/signer',
                    },
                },
            }, 
            // legal: {
            //     title: 'Legal',
            //     links: {
            //         privacyPolicy: {
            //             title: 'Privacy Policy',
            //             link: '#',
            //         },
            //         termsOfUse: {
            //             title: 'Terms of use',
            //             link: '#',
            //         },
            //         cookies: {
            //             title: 'Cookies',
            //             link: '#',
            //         },
            //         gdpr: {
            //             title: 'GDPR',
            //             link: '#',
            //         },
            //     },
            // },
        },
    },
}
