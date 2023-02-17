import { createStyles } from "@mantine/core";


const useStyles = createStyles((theme) => ({
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: 32,
    hieght:16,
  },
}));

export function Logo(props) {
  const { classes } = useStyles();
  const { src, alt } = props;

  return (
    <div className={classes.logoContainer}>
      <img className={classes.logo} src={'./favicon-32x32.png'} alt={'./favicon-32x32.png'} />
    </div>
  );
}

// const useStyles = createStyles((theme) => ({
//   logoBG: {
//     fill:
//       theme.colorScheme === "dark"
//         ? theme.colors.brand[2]
//         : theme.colors.brand[9],
//   },
//   logoStroke: {
//     stroke:
//       theme.colorScheme === "dark"
//         ? theme.colors.brand[9]
//         : theme.colors.dark[0],
//   },
// }));

// export function Logo(props) {
//   const { classes } = useStyles();

//   return (
//     <svg
//       {...props}
//       viewBox="0 0 1769 258"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <circle cx="100" cy="129" r="100" className={classes.logoBG} />
//       <path
//         d="M307.4 206.8C342.6 206.8 362.8 189.6 362.8 163.4C362.8 141.6 352.4 130 322.2 116.8L312.4 112.4C297.6 106 289.4 98.2 289.4 84C289.4 68 301.6 59.2 319.4 59.2C330.6 59.2 337.2 62.4 348.4 71.2L347 63.2L333.8 57.6L343.4 93.8H354L355.4 62.4C345 55.4 332 51.2 316.4 51.2C286 51.2 264.6 65.8 264.6 92.2C264.6 115 278.2 128 303.8 139.4L313.2 143.4C331.2 151.2 337.2 158.6 337.2 172.4C337.2 189.2 325.2 198.8 304.8 198.8C291.2 198.8 282.8 196.4 269.6 187.2L271.8 194.6L284.2 200L274 162.2H263.6L262.2 195C273.4 202.4 290.8 206.8 307.4 206.8ZM433.336 206.4C464.936 206.4 487.936 185 487.936 149.2C487.936 113.2 462.936 92.8 433.336 92.8C403.936 92.8 379.136 113.6 379.136 149.2C379.136 184.6 401.736 206.4 433.336 206.4ZM433.336 199.6C417.336 199.6 407.936 183 407.936 149.4C407.936 115.8 417.336 99.4 433.336 99.4C449.736 99.4 458.936 115.8 458.936 149.4C458.936 183 449.736 199.6 433.336 199.6ZM558.522 206.4C579.922 206.4 592.922 198.2 602.322 181.4L598.722 178.8C591.322 188.4 581.522 193.6 569.922 193.6C547.722 193.6 533.122 176.8 533.122 147.6C533.122 117.2 547.122 99.4 565.722 99.4C572.722 99.4 579.122 101.4 586.722 105.8L573.122 97L576.722 115.8C577.522 127.8 583.322 132 590.722 132C596.722 132 600.522 129 602.322 122.6C599.322 105.4 583.122 92.8 562.722 92.8C531.322 92.8 504.722 113.2 504.722 151.2C504.722 186.6 528.322 206.4 558.522 206.4ZM617.808 203H673.008V197.2L651.408 195H639.008L617.808 197.2V203ZM631.808 203H660.208C659.608 193 659.408 170 659.408 156.2V125.6L660.008 94.8L657.608 93L616.008 103.6V108.6L631.808 109.8C632.208 119.4 632.408 128.2 632.408 141.4V156.2C632.408 170 632.208 193 631.808 203ZM644.808 72C653.408 72 660.208 66 660.208 57.4C660.208 49 653.408 42.8 644.808 42.8C636.408 42.8 629.608 49 629.608 57.4C629.608 66 636.408 72 644.808 72ZM716.934 206.4C733.134 206.4 741.134 199.4 752.734 186.6H759.734L756.734 176C743.134 190.6 736.134 194 729.734 194C719.934 194 713.334 188 713.334 176C713.334 162.6 720.734 153.6 735.134 147.8C742.134 145.2 753.734 142.2 764.534 139.4V134.2C753.734 136.8 739.134 140.4 728.734 143.6C698.134 152 688.334 162.2 688.334 179.6C688.334 196.4 700.334 206.4 716.934 206.4ZM772.934 206.2C784.134 206.2 791.134 202 795.934 192.4L792.534 189.6C788.934 194.8 786.734 196.4 783.534 196.4C779.134 196.4 776.934 193.4 776.934 184.2V131.8C776.934 104.2 765.334 92.8 738.734 92.8C710.534 92.8 693.934 104 691.534 121.8C692.934 127.8 697.334 131 703.734 131C710.334 131 716.134 126.8 716.734 115.2L718.934 99.8L706.334 104.8C715.934 101 722.734 99.4 729.734 99.4C745.134 99.4 750.534 105.6 750.534 126.8V184.4C752.134 197.8 759.134 206.2 772.934 206.2ZM803.327 203H861.527V197.2L838.327 195H825.727L803.327 197.2V203ZM818.527 203H846.727C846.127 189.2 845.927 171.2 845.927 156.2V73L846.727 41.2L843.727 39.4L803.327 47V52.4L819.127 53.6V156.2C819.127 171.2 818.927 189.2 818.527 203ZM876.82 203H910.22V193.6H907.42L876.82 196.6V203ZM895.42 203H924.62C924.02 179.6 924.02 155.8 924.02 128.4V124.2C924.02 100.4 924.02 77.6 924.62 55H895.42C896.02 77.8 896.02 100.6 896.02 123.6V132C896.02 156 896.02 179.8 895.42 203ZM910.22 203H938.22C987.82 203 1002.42 182.2 1002.42 162.2C1002.42 140.4 986.22 125.8 945.62 123.6L945.02 125.6C982.02 121.6 994.02 106.6 994.02 89.8C994.02 69.6 979.82 55 943.22 55H910.22V62.2H935.82C957.82 62.2 966.82 72.6 966.82 90.6C966.82 110.8 955.62 122.2 933.22 122.2H910.22V129.2H935.02C961.42 129.2 973.42 140 973.42 162.6C973.42 184.4 959.82 196 937.22 196H910.22V203ZM876.82 61.6L907.42 64.2H910.22V55H876.82V61.6ZM1058.66 206.4C1075.46 206.4 1088.86 196.4 1098.66 182.4H1108.26L1101.46 172.4C1093.66 183.4 1083.26 191.2 1071.86 191.2C1061.06 191.2 1054.46 185.4 1054.46 167.6V125.4L1055.66 96.2L1053.26 94L1013.26 99V104.4L1033.86 108L1028.06 103.6L1027.46 165.6C1027.06 195.6 1039.06 206.4 1058.66 206.4ZM1097.06 205.6L1136.66 203.2V197.4L1123.06 196V125.4L1123.86 96.2L1121.66 94L1082.26 99.8V104.4L1096.66 106.8L1096.06 180.8V181.2L1097.06 205.6ZM1177.01 103.8H1216.41V96H1177.01V103.8ZM1192.21 206.4C1205.81 206.4 1215.01 201.2 1221.01 191.8L1217.81 188.6C1212.41 192.6 1208.81 194.6 1203.61 194.6C1195.21 194.6 1190.41 189.6 1190.41 178.4V99.2L1190.81 64H1173.41L1164.21 98L1167.81 95.4L1146.01 97.6V103.8H1163.41V156.2C1163.41 164 1163.21 169.2 1163.21 176.8C1163.21 197.4 1173.01 206.4 1192.21 206.4ZM1254.94 103.8H1294.34V96H1254.94V103.8ZM1270.14 206.4C1283.74 206.4 1292.94 201.2 1298.94 191.8L1295.74 188.6C1290.34 192.6 1286.74 194.6 1281.54 194.6C1273.14 194.6 1268.34 189.6 1268.34 178.4V99.2L1268.74 64H1251.34L1242.14 98L1245.74 95.4L1223.94 97.6V103.8H1241.34V156.2C1241.34 164 1241.14 169.2 1241.14 176.8C1241.14 197.4 1250.94 206.4 1270.14 206.4ZM1362.47 206.4C1382.27 206.4 1397.07 197.2 1405.67 181.2L1402.07 178.4C1394.87 188 1385.67 193.6 1371.47 193.6C1350.67 193.6 1335.47 179.6 1335.47 146.6C1335.47 114.2 1346.47 99.4 1360.07 99.4C1372.67 99.4 1380.87 109.4 1380.87 127C1380.87 138 1378.27 142.2 1369.87 142.2H1318.87V149H1404.87C1405.87 145.4 1406.27 141.8 1406.27 137C1406.27 112.2 1390.27 92.8 1361.07 92.8C1332.67 92.8 1307.07 113.4 1307.07 149.4C1307.07 186.4 1330.07 206.4 1362.47 206.4ZM1420.72 203H1481.72V197.2L1459.52 194.8H1442.32L1420.72 197.2V203ZM1434.92 203H1463.12C1462.72 193 1462.52 170 1462.52 156.2V123.4L1461.12 94.8L1458.52 93L1419.32 104V109L1434.92 110.4C1435.32 120 1435.52 127.6 1435.52 141V156.2C1435.52 170 1435.32 193 1434.92 203ZM1462.52 139C1467.72 121.4 1474.72 112 1486.32 106L1478.92 105L1483.52 110.2C1488.52 116.8 1492.92 120.8 1499.72 120.8C1508.72 120.8 1512.72 114.6 1512.92 106.2C1510.92 96.2 1503.72 92.8 1494.72 92.8C1481.52 92.8 1466.92 105 1461.32 127H1455.92L1462.52 139ZM1520.52 203H1580.92V197.2L1559.92 195H1543.12L1520.52 197.2V203ZM1535.52 203H1563.72C1563.32 187.6 1563.12 171.8 1563.12 156.2V102.2C1561.72 75.4 1564.12 59.8 1571.92 50.4C1576.72 45.6 1582.52 43.2 1590.32 42V39.8H1582.12V42.2L1585.92 48.6C1591.92 58.2 1598.92 61.2 1605.32 61.2C1613.12 61.2 1616.52 56.6 1616.72 50.2C1614.32 41 1603.92 37.2 1591.72 37.2C1578.72 37.2 1565.92 41.4 1554.92 51.4C1545.32 60.4 1537.72 73.2 1536.12 99.8L1545.52 94.8L1519.32 97.6V103.8H1536.12V156.2C1536.12 171.8 1535.92 187.6 1535.52 203ZM1549.72 103.8H1590.52V96H1549.72V103.8ZM1590.52 203H1647.92V197.2L1624.72 195H1611.92L1590.52 197.2V203ZM1604.92 203H1633.12C1632.72 189.2 1632.52 171.2 1632.52 156.2V73L1632.92 41L1630.72 39.4L1605.52 46.4V156.2C1605.52 171.2 1605.32 189.2 1604.92 203ZM1671.8 257.2C1688.4 257.2 1701.8 245.6 1714.6 211.6L1757.6 96H1749.4L1733.2 145.2L1715.6 193.2L1714 198L1707.8 212.4C1699.6 232.8 1691.4 244.8 1678.8 250.2L1682.6 253.6L1689.6 249L1683.6 241.8C1678.8 236.2 1673.4 232 1666.4 232C1659.2 232 1652.4 235.6 1651 243.4C1651.6 252 1661.4 257.2 1671.8 257.2ZM1709.2 217.6L1721.4 185.8L1720.2 183.6L1688.2 96H1659L1709.2 217.6ZM1650.6 101.8L1670.8 104H1688L1707.8 101.8V96H1650.6V101.8ZM1727.2 101.8L1748.2 103.8H1751.8L1768.2 101.8V96H1727.2V101.8Z"
//         fill="currentColor"
//       />
//       <rect
//         x="92"
//         y="95.5"
//         width="16"
//         height="87"
//         rx="8"
//         fill="#00ED64"
//         className={classes.logoStroke}
//         strokeWidth="4"
//       />
//       <path
//         d="M168 109.5V110.5C168 127.069 154.569 140.5 138 140.5H108V109.5C108 92.9315 121.431 79.5 138 79.5C154.569 79.5 168 92.9315 168 109.5Z"
//         className={classes.logoStroke}
//         fill="#00ED64"
//         strokeWidth="4"
//       />
//       <path
//         d="M92 109.5V140.5H62C45.4315 140.5 32 127.069 32 110.5V109.5C32 92.9315 45.4315 79.5 62 79.5C78.5685 79.5 92 92.9315 92 109.5Z"
//         className={classes.logoStroke}
//         fill="#00ED64"
//         strokeWidth="4"
//       />
//       <path
//         d="M67 141.5H92V168C92 182.083 80.5833 193.5 66.5 193.5C52.44 193.5 41 181.859 41 167.752C41 153.369 52.6638 141.5 67 141.5Z"
//         className={classes.logoStroke}
//         fill="#00ED64"
//         strokeWidth="4"
//       />
//       <path
//         d="M108 141.5H133C147.336 141.5 159 153.369 159 167.752C159 181.859 147.56 193.5 133.5 193.5C119.417 193.5 108 182.083 108 168V141.5Z"
//         className={classes.logoStroke}
//         fill="#00ED64"
//         strokeWidth="4"
//       />
//       <path
//         d="M100 94.5L98.5036 94.6032L101.495 94.6267L100 94.5ZM68.8203 63.4892C82.7369 65.1688 90.108 72.9192 94.0533 80.2717C96.0372 83.969 97.1536 87.5707 97.7729 90.2517C98.082 91.5899 98.2657 92.6923 98.3717 93.4539C98.4247 93.8345 98.4582 94.1294 98.4782 94.3255C98.4882 94.4235 98.4948 94.4968 98.4988 94.5436C98.5007 94.5671 98.5021 94.5839 98.5028 94.5939C98.5032 94.5989 98.5035 94.6022 98.5036 94.6037C98.5036 94.6045 98.5037 94.6049 98.5037 94.6048C98.5037 94.6047 98.5036 94.6043 98.5036 94.6043C98.5036 94.6038 98.5036 94.6032 100 94.5C101.496 94.3968 101.496 94.396 101.496 94.395C101.496 94.3946 101.496 94.3935 101.496 94.3926C101.496 94.3907 101.496 94.3884 101.496 94.3857C101.495 94.3802 101.495 94.373 101.494 94.3641C101.493 94.3462 101.491 94.3213 101.488 94.2898C101.483 94.2267 101.474 94.1366 101.463 94.0214C101.439 93.791 101.401 93.4595 101.343 93.0403C101.226 92.2023 101.027 91.0117 100.696 89.5765C100.034 86.7105 98.8378 82.8435 96.6967 78.8533C92.392 70.8308 84.2631 62.3312 69.1797 60.5108L68.8203 63.4892ZM100 94.5C101.495 94.6267 101.495 94.6272 101.495 94.6277C101.495 94.6277 101.495 94.6281 101.495 94.6281C101.495 94.6281 101.495 94.6277 101.495 94.6269C101.495 94.6252 101.495 94.6217 101.496 94.6165C101.497 94.6061 101.498 94.5888 101.501 94.5648C101.505 94.5167 101.513 94.4417 101.525 94.3416C101.548 94.1414 101.587 93.8406 101.646 93.4529C101.764 92.6772 101.965 91.5556 102.294 90.1961C102.952 87.4724 104.116 83.8202 106.132 80.0881C110.146 72.6602 117.515 64.9278 131.157 63.4918L130.843 60.5082C115.985 62.0722 107.854 70.5898 103.493 78.6619C101.322 82.6798 100.079 86.5901 99.3779 89.4914C99.0268 90.9444 98.8099 92.151 98.6803 93.0002C98.6154 93.425 98.5723 93.761 98.5451 93.9943C98.5315 94.111 98.5219 94.2021 98.5155 94.2658C98.5123 94.2977 98.5099 94.3227 98.5083 94.3407C98.5074 94.3497 98.5068 94.3569 98.5063 94.3624C98.5061 94.3651 98.5059 94.3674 98.5057 94.3692C98.5056 94.3701 98.5055 94.3712 98.5055 94.3716C98.5054 94.3725 98.5054 94.3733 100 94.5Z"
//         className={classes.logoStroke}
//       />
//       <path
//         d="M64.5 125.79C73.0777 125.79 80.0312 118.865 80.0312 110.323C80.0312 101.78 73.0777 94.855 64.5 94.855C55.9223 94.855 48.9688 101.78 48.9688 110.323C48.9688 118.865 55.9223 125.79 64.5 125.79Z"
        
//         className={`${classes.logoStroke} ${classes.logoBG}`}
//         strokeWidth="2"
//         strokeMiterlimit="10"
//       />
//       <path
//         d="M66.7188 181.032C74.071 181.032 80.0312 175.096 80.0312 167.774C80.0312 160.452 74.071 154.516 66.7188 154.516C59.3665 154.516 53.4062 160.452 53.4062 167.774C53.4062 175.096 59.3665 181.032 66.7188 181.032Z"
        
//         className={`${classes.logoStroke} ${classes.logoBG}`}
//         strokeWidth="2"
//         strokeMiterlimit="10"
//       />
//       <path
//         d="M135.5 125.79C144.078 125.79 151.031 118.865 151.031 110.323C151.031 101.78 144.078 94.855 135.5 94.855C126.922 94.855 119.969 101.78 119.969 110.323C119.969 118.865 126.922 125.79 135.5 125.79Z"
        
//         className={`${classes.logoStroke} ${classes.logoBG}`}
//         strokeWidth="2"
//         strokeMiterlimit="10"
//       />
//       <path
//         d="M133.281 181.032C140.634 181.032 146.594 175.096 146.594 167.774C146.594 160.452 140.634 154.516 133.281 154.516C125.929 154.516 119.969 160.452 119.969 167.774C119.969 175.096 125.929 181.032 133.281 181.032Z"
        
//         className={`${classes.logoStroke} ${classes.logoBG}`}
//         strokeWidth="2"
//         strokeMiterlimit="10"
//       />
//     </svg>
//   );
// }