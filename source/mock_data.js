const mockPosts = [
  {
    id: 1, // Automatic
    status: 'DRAFT',
    title: 'Pokkern te mas', // Manual
    content: 'Nå orker jeg ikke mer. Ut på tur', // Manual
    date: new Date(Date.parse('01 Jun 2020 00:00:00 GMT')), // Automatic
    location: 'geo:59.94313,10.79185?z=19', // Automatic (GPS)
    distance: 0, // Manual
    images: [
      {
        url:
          'https://lh3.googleusercontent.com/z2T8vXAwanRd4DapTZn7Y_VlPgEM511DM_t_6vfCzhKny7t5Qk00_nxnNAM2rtcbhUAmd-3G1gyeT3SUxcTCFwbK-HzPmr47p5yVnNRecv9hYNS86qn7o5ZXp0fDyEE-3En-qhH8Mrw=w1280-h720-no',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
      },
      {
        url:
          'https://lh3.googleusercontent.com/MtEhwPs3BTegHH0o8AwQw1UL9fiUe3_1F4uw9cpFcNoS-LG0deZ9ttt2K5NmHbrHdgaJPaATSzhBqp3kXEeTXmDx9jcP7fTIU0P1TftAviHMgFGlVgPLIb7KMDTtFTUxyQhTdlLgFSg=w1280-h720-no',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
      },
      {
        url:
          'https://lh3.googleusercontent.com/xlJSJwaWTsoNfGVLrynnycQLXjXQ9pOimqFEAfSPLF2Igmqz5CsUods0JfbhRo2ImsXSNs4dl5TBhuKnCdiHX5TaFQNnxXsY9a5sKgUsDDxy_vv7l0zYmeUDezxUbilmYWGg2UKCeaA=w1280-h720-no',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
      },
      {
        url:
          'https://lh3.googleusercontent.com/YZ6jR9tuwWoPllRY1vLx-rm8CS2FeO1WScxTIS91grJMmHFuPKXl7Lq00jdoYJgVZXPnyqUa7taMwEfzLpXHDDzIxBYds5fS13WCYpHROUR5pmFEQW0jCDDYLUnt8WR2P0piO-Rsv4E=w1280-h720-no',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
      },
      {
        url:
          'https://lh3.googleusercontent.com/2anJ7oiJUpunf9V4qqVsaQU-BNaiOFB8Ib6KKaLnBP4YNa6DX5R-nXy2qvXdUS4GDYtFLE6aBfQ5rclmrbPqnJrvv1Q-n-phIQyMJ7Vn_OM7jLbnJrTOx6aZTsvXuPP8a4V9GEzJta0=w1280-h720-no',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
      }
    ]
  },
  {
    id: 2,
    status: 'DRAFT',
    title: 'Larvik - Kiel',
    content:
      'Gøy å være på tur, men Larvik - Kiel kjenner jeg at jeg klarer meg uten',
    date: new Date(Date.parse('02 Jun 2020 04:00:00 GMT')),
    location: 'geo:59.12640,10.22735?z=18',
    distance: 110,
    images: [
      {
        url:
          'https://lh3.googleusercontent.com/z2T8vXAwanRd4DapTZn7Y_VlPgEM511DM_t_6vfCzhKny7t5Qk00_nxnNAM2rtcbhUAmd-3G1gyeT3SUxcTCFwbK-HzPmr47p5yVnNRecv9hYNS86qn7o5ZXp0fDyEE-3En-qhH8Mrw=w1280-h720-no',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
      },
      {
        url:
          'https://lh3.googleusercontent.com/MtEhwPs3BTegHH0o8AwQw1UL9fiUe3_1F4uw9cpFcNoS-LG0deZ9ttt2K5NmHbrHdgaJPaATSzhBqp3kXEeTXmDx9jcP7fTIU0P1TftAviHMgFGlVgPLIb7KMDTtFTUxyQhTdlLgFSg=w1280-h720-no',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
      },
      {
        url:
          'https://lh3.googleusercontent.com/xlJSJwaWTsoNfGVLrynnycQLXjXQ9pOimqFEAfSPLF2Igmqz5CsUods0JfbhRo2ImsXSNs4dl5TBhuKnCdiHX5TaFQNnxXsY9a5sKgUsDDxy_vv7l0zYmeUDezxUbilmYWGg2UKCeaA=w1280-h720-no',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
      },
      {
        url:
          'https://lh3.googleusercontent.com/YZ6jR9tuwWoPllRY1vLx-rm8CS2FeO1WScxTIS91grJMmHFuPKXl7Lq00jdoYJgVZXPnyqUa7taMwEfzLpXHDDzIxBYds5fS13WCYpHROUR5pmFEQW0jCDDYLUnt8WR2P0piO-Rsv4E=w1280-h720-no',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
      },
      {
        url:
          'https://lh3.googleusercontent.com/2anJ7oiJUpunf9V4qqVsaQU-BNaiOFB8Ib6KKaLnBP4YNa6DX5R-nXy2qvXdUS4GDYtFLE6aBfQ5rclmrbPqnJrvv1Q-n-phIQyMJ7Vn_OM7jLbnJrTOx6aZTsvXuPP8a4V9GEzJta0=w1280-h720-no',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
      }
    ]
  },
  {
    id: 3,
    status: 'PUBLISHED',
    title: 'Ugh. Danmark',
    content:
      'Danmark vokser dessvere ikke på meg. Jeg prøver, men får det ikke til',
    date: new Date(Date.parse('03 Jun 2020 04:00:00 GMT')),
    location: 'geo:57.5914,9.9693?z=15',
    distance: 110,
    images: [
      {
        url:
          'https://lh3.googleusercontent.com/z2T8vXAwanRd4DapTZn7Y_VlPgEM511DM_t_6vfCzhKny7t5Qk00_nxnNAM2rtcbhUAmd-3G1gyeT3SUxcTCFwbK-HzPmr47p5yVnNRecv9hYNS86qn7o5ZXp0fDyEE-3En-qhH8Mrw=w1280-h720-no',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
      },
      {
        url:
          'https://lh3.googleusercontent.com/MtEhwPs3BTegHH0o8AwQw1UL9fiUe3_1F4uw9cpFcNoS-LG0deZ9ttt2K5NmHbrHdgaJPaATSzhBqp3kXEeTXmDx9jcP7fTIU0P1TftAviHMgFGlVgPLIb7KMDTtFTUxyQhTdlLgFSg=w1280-h720-no',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
      },
      {
        url:
          'https://lh3.googleusercontent.com/xlJSJwaWTsoNfGVLrynnycQLXjXQ9pOimqFEAfSPLF2Igmqz5CsUods0JfbhRo2ImsXSNs4dl5TBhuKnCdiHX5TaFQNnxXsY9a5sKgUsDDxy_vv7l0zYmeUDezxUbilmYWGg2UKCeaA=w1280-h720-no',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
      },
      {
        url:
          'https://lh3.googleusercontent.com/YZ6jR9tuwWoPllRY1vLx-rm8CS2FeO1WScxTIS91grJMmHFuPKXl7Lq00jdoYJgVZXPnyqUa7taMwEfzLpXHDDzIxBYds5fS13WCYpHROUR5pmFEQW0jCDDYLUnt8WR2P0piO-Rsv4E=w1280-h720-no',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
      },
      {
        url:
          'https://lh3.googleusercontent.com/2anJ7oiJUpunf9V4qqVsaQU-BNaiOFB8Ib6KKaLnBP4YNa6DX5R-nXy2qvXdUS4GDYtFLE6aBfQ5rclmrbPqnJrvv1Q-n-phIQyMJ7Vn_OM7jLbnJrTOx6aZTsvXuPP8a4V9GEzJta0=w1280-h720-no',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
      }
    ]
  },
  {
    id: 4,
    status: 'UNPUBLISHED',
    title: 'Guten Tag',
    content:
      'Tyskland er fint da. Fine landeveier å kjøre på, og autobahn om man kjeder seg',
    date: new Date(Date.parse('05 Jun 2020 04:00:00 GMT')),
    location: 'geo:54.393,9.316?z=5',
    distance: 300,
    images: [
      'https://lh3.googleusercontent.com/z2T8vXAwanRd4DapTZn7Y_VlPgEM511DM_t_6vfCzhKny7t5Qk00_nxnNAM2rtcbhUAmd-3G1gyeT3SUxcTCFwbK-HzPmr47p5yVnNRecv9hYNS86qn7o5ZXp0fDyEE-3En-qhH8Mrw=w1280-h720-no',
      'https://lh3.googleusercontent.com/MtEhwPs3BTegHH0o8AwQw1UL9fiUe3_1F4uw9cpFcNoS-LG0deZ9ttt2K5NmHbrHdgaJPaATSzhBqp3kXEeTXmDx9jcP7fTIU0P1TftAviHMgFGlVgPLIb7KMDTtFTUxyQhTdlLgFSg=w1280-h720-no',
      'https://lh3.googleusercontent.com/xlJSJwaWTsoNfGVLrynnycQLXjXQ9pOimqFEAfSPLF2Igmqz5CsUods0JfbhRo2ImsXSNs4dl5TBhuKnCdiHX5TaFQNnxXsY9a5sKgUsDDxy_vv7l0zYmeUDezxUbilmYWGg2UKCeaA=w1280-h720-no',
      'https://lh3.googleusercontent.com/YZ6jR9tuwWoPllRY1vLx-rm8CS2FeO1WScxTIS91grJMmHFuPKXl7Lq00jdoYJgVZXPnyqUa7taMwEfzLpXHDDzIxBYds5fS13WCYpHROUR5pmFEQW0jCDDYLUnt8WR2P0piO-Rsv4E=w1280-h720-no',
      'https://lh3.googleusercontent.com/2anJ7oiJUpunf9V4qqVsaQU-BNaiOFB8Ib6KKaLnBP4YNa6DX5R-nXy2qvXdUS4GDYtFLE6aBfQ5rclmrbPqnJrvv1Q-n-phIQyMJ7Vn_OM7jLbnJrTOx6aZTsvXuPP8a4V9GEzJta0=w1280-h720-no'
    ]
  },
  {
    id: 5,
    status: 'DRAFT',
    title: 'Berlin!',
    content:
      'YAy. Har lenge ønsket å besøke Berlin, men det ble aldri sånn. Før nå. Wohoi',
    date: new Date(Date.parse('07 Jun 2020 04:00:00 GMT')),
    location: 'geo:52.5168,13.3887?z=15',
    distance: 900,
    images: [
      {
        url:
          'https://lh3.googleusercontent.com/z2T8vXAwanRd4DapTZn7Y_VlPgEM511DM_t_6vfCzhKny7t5Qk00_nxnNAM2rtcbhUAmd-3G1gyeT3SUxcTCFwbK-HzPmr47p5yVnNRecv9hYNS86qn7o5ZXp0fDyEE-3En-qhH8Mrw=w1280-h720-no',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
      },
      {
        url:
          'https://lh3.googleusercontent.com/MtEhwPs3BTegHH0o8AwQw1UL9fiUe3_1F4uw9cpFcNoS-LG0deZ9ttt2K5NmHbrHdgaJPaATSzhBqp3kXEeTXmDx9jcP7fTIU0P1TftAviHMgFGlVgPLIb7KMDTtFTUxyQhTdlLgFSg=w1280-h720-no',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
      },
      {
        url:
          'https://lh3.googleusercontent.com/xlJSJwaWTsoNfGVLrynnycQLXjXQ9pOimqFEAfSPLF2Igmqz5CsUods0JfbhRo2ImsXSNs4dl5TBhuKnCdiHX5TaFQNnxXsY9a5sKgUsDDxy_vv7l0zYmeUDezxUbilmYWGg2UKCeaA=w1280-h720-no',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
      },
      {
        url:
          'https://lh3.googleusercontent.com/YZ6jR9tuwWoPllRY1vLx-rm8CS2FeO1WScxTIS91grJMmHFuPKXl7Lq00jdoYJgVZXPnyqUa7taMwEfzLpXHDDzIxBYds5fS13WCYpHROUR5pmFEQW0jCDDYLUnt8WR2P0piO-Rsv4E=w1280-h720-no',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
      },
      {
        url:
          'https://lh3.googleusercontent.com/2anJ7oiJUpunf9V4qqVsaQU-BNaiOFB8Ib6KKaLnBP4YNa6DX5R-nXy2qvXdUS4GDYtFLE6aBfQ5rclmrbPqnJrvv1Q-n-phIQyMJ7Vn_OM7jLbnJrTOx6aZTsvXuPP8a4V9GEzJta0=w1280-h720-no',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
      }
    ]
  }
]

const mockUploadImagesToPost = [
  {
    url:
      'https://lh3.googleusercontent.com/z2T8vXAwanRd4DapTZn7Y_VlPgEM511DM_t_6vfCzhKny7t5Qk00_nxnNAM2rtcbhUAmd-3G1gyeT3SUxcTCFwbK-HzPmr47p5yVnNRecv9hYNS86qn7o5ZXp0fDyEE-3En-qhH8Mrw=w1280-h720-no',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
  },
  {
    url:
      'https://lh3.googleusercontent.com/MtEhwPs3BTegHH0o8AwQw1UL9fiUe3_1F4uw9cpFcNoS-LG0deZ9ttt2K5NmHbrHdgaJPaATSzhBqp3kXEeTXmDx9jcP7fTIU0P1TftAviHMgFGlVgPLIb7KMDTtFTUxyQhTdlLgFSg=w1280-h720-no',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
  },
  {
    url:
      'https://lh3.googleusercontent.com/xlJSJwaWTsoNfGVLrynnycQLXjXQ9pOimqFEAfSPLF2Igmqz5CsUods0JfbhRo2ImsXSNs4dl5TBhuKnCdiHX5TaFQNnxXsY9a5sKgUsDDxy_vv7l0zYmeUDezxUbilmYWGg2UKCeaA=w1280-h720-no',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
  },
  {
    url:
      'https://lh3.googleusercontent.com/YZ6jR9tuwWoPllRY1vLx-rm8CS2FeO1WScxTIS91grJMmHFuPKXl7Lq00jdoYJgVZXPnyqUa7taMwEfzLpXHDDzIxBYds5fS13WCYpHROUR5pmFEQW0jCDDYLUnt8WR2P0piO-Rsv4E=w1280-h720-no',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
  },
  {
    url:
      'https://lh3.googleusercontent.com/2anJ7oiJUpunf9V4qqVsaQU-BNaiOFB8Ib6KKaLnBP4YNa6DX5R-nXy2qvXdUS4GDYtFLE6aBfQ5rclmrbPqnJrvv1Q-n-phIQyMJ7Vn_OM7jLbnJrTOx6aZTsvXuPP8a4V9GEzJta0=w1280-h720-no',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
  }
]

module.exports = {
  mockPosts
}