export const getDocument = (): string => {
  return `
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <style type="text/css">
        body {
          margin: 0;
          padding: 0;
          width: 100%;
          font-family: 'Open Sans', sans-serif;
          flex: 1;
          flex-direction: column;
          background-color: #fff;
          display: flex;
        }
      </style>
    </head>

    <body>
      <!-- Page 1 -->
      <div class="page">
        <div class="header-line"></div>
        <div class="logo-container">
          <svg width="200" height="53" viewBox="0 0 200 53" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M131.249 12.4064L120.179 39.3125C119.998 39.758 120.324 40.2449 120.804 40.2449H125.047C125.327 40.2449 125.575 40.074 125.673 39.8202L128.226 33.3708H140.759L143.508 39.8357C143.616 40.0844 143.859 40.2449 144.128 40.2449H148.397C148.883 40.2449 149.214 39.7425 149.017 39.297L137.162 12.3909C137.053 12.1474 136.81 11.9868 136.541 11.9868H131.864C131.59 11.9868 131.342 12.1526 131.239 12.4064H131.249ZM129.89 29.2214L134.231 18.0373L138.996 29.2214H129.895H129.89Z"
              fill="#404041"
            />
            <path
              d="M166.557 35.899C164.542 35.899 162.723 35.4898 161.11 34.6765C159.498 33.8632 158.242 32.7028 157.358 31.2058C156.469 29.7087 156.025 28.0147 156.025 26.1291C156.025 24.2435 156.474 22.6014 157.369 21.094C158.263 19.5813 159.519 18.4158 161.131 17.5818C162.743 16.7529 164.552 16.3385 166.557 16.3385C168.16 16.3385 169.695 16.5613 171.167 17.0068C172.356 17.3642 173.633 17.9029 174.992 18.623C175.441 18.8613 175.979 18.5349 175.979 18.0273V14.4581C175.979 14.1991 175.829 13.9556 175.591 13.8416C173.963 13.0646 172.434 12.5051 171.012 12.1684C169.477 11.8058 167.912 11.6245 166.309 11.6245C163.281 11.6245 160.562 12.2358 158.144 13.4635C155.73 14.6912 153.834 16.4369 152.454 18.7007C151.074 20.9645 150.386 23.5235 150.386 26.3674C150.386 29.0249 151.053 31.4699 152.397 33.7026C153.735 35.9353 155.575 37.6448 157.916 38.831C160.258 40.0173 162.914 40.613 165.886 40.613C167.932 40.613 169.72 40.411 171.255 40.007C172.687 39.6288 174.242 39.0123 175.927 38.1576C176.155 38.0436 176.299 37.8054 176.299 37.5515V33.9513C176.299 33.4436 175.762 33.1224 175.312 33.3504C173.607 34.231 172.165 34.8578 170.981 35.236C169.576 35.6815 168.098 35.9042 166.552 35.9042L166.557 35.899Z"
              fill="#404041"
            />
            <path
              d="M186.939 35.9765V27.9472H193.601C193.973 27.9472 194.278 27.6467 194.278 27.2686V24.3521C194.278 23.9791 193.978 23.6735 193.601 23.6735H186.939V16.2502H199.038C199.41 16.2502 199.715 15.9498 199.715 15.5716V12.6552C199.715 12.2822 199.415 11.9766 199.038 11.9766H182.164C181.792 11.9766 181.487 12.277 181.487 12.6552V39.5613C181.487 39.9342 181.787 40.2399 182.164 40.2399H199.322C199.694 40.2399 199.999 39.9394 199.999 39.5613V36.6448C199.999 36.2718 199.699 35.9662 199.322 35.9662H186.939V35.9765Z"
              fill="#404041"
            />
            <path
              d="M111.757 23.8806H97.1258V12.6654C97.1258 12.2925 96.826 11.9868 96.4487 11.9868H92.3504C91.9783 11.9868 91.6734 12.2873 91.6734 12.6654V39.5715C91.6734 39.9445 91.9732 40.2501 92.3504 40.2501H96.4487C96.8208 40.2501 97.1258 39.9497 97.1258 39.5715V28.3149H111.757V39.5715C111.757 39.9445 112.056 40.2501 112.434 40.2501H116.532C116.904 40.2501 117.209 39.9497 117.209 39.5715V12.6654C117.209 12.2925 116.909 11.9868 116.532 11.9868H112.434C112.062 11.9868 111.757 12.2873 111.757 12.6654V23.8806Z"
              fill="#404041"
            />
            <path
              d="M77.9913 23.9224C77.3556 23.7566 76.7303 23.6064 76.0946 23.4561C72.6888 22.6428 69.9963 22.0005 69.9963 19.9958C69.9963 17.5507 72.0325 16.3592 76.2238 16.3592C80.0689 16.3592 83.5109 17.8252 85.1285 18.6385C85.5781 18.8665 86.1052 18.5401 86.1052 18.0324V14.8881C86.1052 14.3597 85.8003 13.8883 85.3197 13.6707C83.6349 12.9092 80.3945 11.6245 75.6553 11.6245C68.2339 11.6245 64.1459 14.598 64.1459 19.9958C64.1459 23.855 67.2571 26.3881 73.9395 27.9785L74.6217 28.1339C78.9888 29.1181 81.3919 29.6569 81.3919 32.0398C81.3919 34.4227 78.9216 35.8213 74.9473 35.7436C69.9239 35.6504 66.5129 34.1533 64.9315 33.2727C64.4819 33.024 63.9289 33.3556 63.9341 33.8736L63.9651 37.3858C63.9651 37.9141 64.2803 38.3804 64.761 38.5979C66.2907 39.2765 69.9962 40.6182 75.5158 40.6182C82.7925 40.6182 87.1337 37.3599 87.1337 31.9051C87.1337 27.7868 84.3998 25.3987 77.9861 23.9275L77.9913 23.9224Z"
              fill="#404041"
            />
            <path
              d="M47.0867 18.2447L40.9573 15.4008C39.0968 14.5357 37.6032 13.0386 36.7401 11.1737L33.9028 5.03C32.4868 1.9633 29.4221 0 26.0524 0C22.6828 0 19.6182 1.9633 18.2021 5.03L15.37 11.1737C14.5069 13.0386 13.0133 14.5357 11.1528 15.4008L5.01824 18.2447C3.48847 18.9544 2.23262 20.0785 1.35921 21.4461C0.490971 22.8085 0 24.4299 0 26.1135C0 29.491 1.95871 32.5629 5.01824 33.9823L11.1476 36.8262C13.0133 37.6861 14.5069 39.1884 15.37 41.0533L18.2073 47.2022C18.9153 48.7355 20.0316 49.9892 21.396 50.8646C22.7604 51.7401 24.3676 52.227 26.0524 52.227C29.4272 52.227 32.4919 50.2637 33.9028 47.197L36.7401 41.0481C37.6032 39.178 39.0968 37.6809 40.9573 36.821L47.0867 33.9771C50.1462 32.5577 52.1049 29.4858 52.1049 26.1083C52.1049 22.7256 50.1462 19.6538 47.0867 18.2396V18.2447ZM26.0473 36.9039C20.104 36.9039 15.2821 32.0759 15.2821 26.1187C15.2821 20.1614 20.0988 15.3283 26.0473 15.3283C31.9958 15.3283 36.8073 20.1562 36.8073 26.1187C36.8073 32.0811 31.9906 36.9039 26.0473 36.9039Z"
              fill="#911E4F"
            />
          </svg>
        </div>
        <!-- # Contract Data # -->
        <!-- width of A4 page -->
        <table class="table" cellspacing="0">
          <tr class="table-header">
            <th dir="ltr"><b>Contract</b></th>
            <th dir="rtl"><b>بيانات العقد</b></th>
          </tr>
          <tr class="table-row-even">
            <td class="ltr" width="75px">Contract Type</td>
            <td class="center" width="150px">{{CONTRACT_TYPE}}</td>
            <td class="rtl" width="75px">نوع العقد</td>
            <td class="ltr" width="75px">Contract No.</td>
            <td class="center" width="150px">{{CONTRACT_NO}}</td>
            <td class="rtl" width="75px">رقم سجل العقد</td>
          </tr>
          <tr class="table-row-odd">
            <td class="ltr" width="75px">Contract Sealing Location</td>
            <td class="center" width="150px">{{CONTRACT_SEALING_LOCATION}}</td>
            <td class="rtl" width="75px">مكان إبرام العقد</td>
            <td class="ltr" width="75px">Contract Sealing Date</td>
            <td class="center" width="150px">{{CONTRACT_SEALING_DATE}}</td>
            <td class="rtl" width="75px">تاريخ إبرام العقد</td>
          </tr>
          <tr class="table-row-even">
            <td class="ltr" width="75px">Tenancy End Date</td>
            <td class="center" width="150px">{{TENANCY_END_DATE}}</td>
            <td class="rtl" width="75px">تاريخ نهاية مَّدة الإيجار</td>
            <td class="ltr" width="75px">Tenancy Start Date</td>
            <td class="center" width="150px">{{TENANCY_START_DATE}}</td>
            <td class="rtl" width="75px">تاريخ بداية مَّدة الإيجار</td>
          </tr>
        </table>
        <br /><br /><br />

        <!-- # Lessor Data # -->
        <table class="table" cellspacing="0">
          <tr class="table-header">
            <td dir="ltr"><b>Lessor Data</b></td>
            <td dir="rtl"><b>بيانات المؤجر</b></td>
          </tr>
          <tr class="table-row-even">
            <td class="ltr" width="75px">Name</td>
            <td class="center" width="250px" style="width: 250px !important">{{LESSOR_NAME}}</td>
            <td class="rtl" width="75px">الإسم</td>
          </tr>
          <tr class="table-row-odd">
            <td class="ltr" width="75px">Nationality</td>
            <td class="center" width="250px" style="width: 250px !important">{{LESSOR_NATIONALITY}}</td>
            <td class="rtl" width="75px">الجنسَّية</td>
          </tr>
          <tr class="table-row-even">
            <td class="ltr" width="75px">ID No.</td>
            <td class="center" width="150px">{{LESSOR_ID_NUMBER}}</td>
            <td class="rtl" width="75px">رقم الهوية</td>
            <td class="ltr" width="75px">ID Type</td>
            <td class="center" width="150px">{{LESSOR_ID_TYPE}}</td>
            <td class="rtl" width="75px">نوع الهوية</td>
          </tr>
          <tr class="table-row-odd">
            <td class="ltr" width="75px">Email</td>
            <td class="center" width="150px">{{LESSOR_EMAIL}}</td>
            <td class="rtl" width="75px">البريد الإلكتروني</td>
            <td class="ltr" width="75px">Mobile No.</td>
            <td class="center" width="150px">{{LESSOR_PHONE_NUMBER}}</td>
            <td class="rtl" width="75px">رقم الجوال</td>
          </tr>
        </table>
        <br /><br /><br />
        <!-- # Lessor Representative Data # -->
        <table class="table" cellspacing="0">
          <tr class="table-header">
            <td dir="ltr"><b>Lessor Representative Data</b></td>
            <td dir="rtl"><b>بيانات ممثل المؤجر</b></td>
          </tr>
          <tr class="table-row-even">
            <td class="ltr long">The lessor is represented by himself or herself</td>
            <td class="rtl long">المؤجر ممثل بنفسه</td>
          </tr>
        </table>
        <br /><br /><br />
        <!-- # Tenant Data # -->
        <table class="table" cellspacing="0">
          <tr class="table-header">
            <th dir="ltr"><b>Tenant Data</b></th>
            <th dir="rtl"><b>بيانات المستأجر</b></th>
          </tr>
          <tr class="table-row-even">
            <td class="ltr" width="75px">Company Name/Founder</td>
            <td class="center" width="250px" style="width: 250px !important">{{ORGANIZATION_NAME}}</td>
            <td class="rtl" width="75px">إسم الشركة/المؤسسة</td>
          </tr>
          <tr class="table-row-odd">
            <td class="ltr" width="75px">Organization Type</td>
            <td class="center" width="150px">{{ORGANIZATION_TYPE}}</td>
            <td class="rtl" width="75px">نوع المنظمة</td>
            <td class="ltr" width="75px">CR No.</td>
            <td class="center" width="150px">{{CR_NUMBER}}</td>
            <td class="rtl" width="75px">رقم السجل التجاري</td>
          </tr>
          <tr class="table-row-even">
            <td class="ltr" width="75px">Unified Number</td>
            <td class="center" width="150px">{{UNIFIED_NUMBER}}</td>
            <td class="rtl" width="75px">الرقم الموحد</td>
            <td class="ltr" width="75px">CR Date</td>
            <td class="center" width="150px">{{CR_DATE}}</td>
            <td class="rtl" width="75px">تاريخ السجل التجاري</td>
          </tr>
          <tr class="table-row-odd">
            <td class="ltr long" width="75px">Issued by</td>
            <td class="center" width="250px" style="width: 250px !important">{{ISSUED_BY}}</td>
            <td class="rtl long" width="75px">جهة الإصدار</td>
          </tr>
        </table>
        <br /><br /><br />
      </div>
      <!-- Page 2 -->
      <div class="page">
        <!-- # Tenant Representative Data # -->
        <table class="table" cellspacing="0">
          <tr class="table-header">
            <th dir="ltr"><b>Tenant Representative Data</b></th>
            <th dir="rtl"><b>بيانات ممثل المستأجر</b></th>
          </tr>
          <tr class="table-row-even">
            <td class="ltr" width="75px">Nationality</td>
            <td class="center" width="150px">{{TENANT_REPRESENTATIVE_NATIONALITY}}</td>
            <td class="rtl" width="75px">الجنسية</td>
            <td class="ltr" width="75px">Name</td>
            <td class="center" width="150px">{{TENANT_REPRESENTATIVE_NAME}}</td>
            <td class="rtl" width="75px">الإسم</td>
          </tr>
          <tr class="table-row-odd">
            <td class="ltr" width="75px">ID No.</td>
            <td class="center" width="150px">{{TENANT_REPRESENTATIVE_ID}}</td>
            <td class="rtl" width="75px">رقم الهوية</td>
            <td class="ltr" width="75px">ID Type</td>
            <td class="center" width="150px">{{TENANT_REPRESENTATIVE_ID_TYPE}}</td>
            <td class="rtl" width="75px">نوع الهوية</td>
          </tr>
          <tr class="table-row-even">
            <td class="ltr" width="75px">Email</td>
            <td class="center" width="150px">{{TENANCY_EMAIL}}</td>
            <td class="rtl" width="75px">الإيميل</td>
            <td class="ltr" width="75px">Phone Number</td>
            <td class="center" width="150px">{{TENANCY_PHONE}}</td>
            <td class="rtl" width="75px">رقم الجوال</td>
          </tr>
        </table>
        <br /><br /><br />
        <!-- # Rental Unit Data # -->
        <table class="table" cellspacing="0">
          <tr class="table-header">
            <th dir="ltr"><b>Rental Unit Data</b></th>
            <th dir="rtl"><b>بيانات الوحدة الإيجارية</b></th>
          </tr>
          <tr class="table-row-even">
            <td class="ltr" width="75px">Type</td>
            <td class="center" width="150px">{{ROOM_TYPE}}</td>
            <td class="rtl" width="75px">النوع</td>
            <td class="ltr" width="75px">Unit Name</td>
            <td class="center" width="150px">{{ROOM_NAME}}</td>
            <td class="rtl" width="75px">إسم الوحدة</td>
          </tr>
          <tr class="table-row-odd">
            <td class="ltr" width="75px">Unit Capacity</td>
            <td class="center" width="150px">{{ROOM_CAPACITY}}</td>
            <td class="rtl" width="75px">سعة الوحدة</td>
            <td class="ltr" width="75px">Floor</td>
            <td class="center" width="150px">{{FLOOR_NAME}}</td>
            <td class="rtl" width="75px">الطابق</td>
          </tr>
        </table>
        <br /><br /><br />
        <!-- # Financial Data # -->
        <table class="table" cellspacing="0">
          <tr class="table-header">
            <th dir="ltr"><b>Financial Data</b></th>
            <th dir="rtl"><b>المعلومات المالية</b></th>
          </tr>
          <tr class="table-row-even">
            <td class="ltr long">Total Contract Value</td>
            <td class="center" width="250px" style="width: 250px !important">{{NET_TOTAL}}</td>
            <td class="rtl long">إجمالي قيمة العقد</td>
          </tr>
        </table>
        <br /><br /><br />
      </div>
      <!-- Page 3 -->
      <div class="page">
        <!-- # Contract Terms # -->
        <table class="table" cellspacing="0">
          <tr class="table-header">
            <th dir="ltr"><b>Contract Terms</b></th>
            <th dir="rtl"><b>مواد العقد</b></th>
          </tr>
          <tr class="table-row-even">
            <td class="rtl long terms">{{CONTRACT_TERMS}}</td>
          </tr>
        </table>
        <br /><br /><br />
        <!-- # Signiture # -->
        <table class="table" cellspacing="0">
          <tr class="table-header">
            <th dir="ltr"><b>Signiture</b></th>
            <th dir="rtl"><b>التوقيع</b></th>
          </tr>
          <tr class="table-row-even">
            <td class="terms" style="text-align: center; color: white; width: 100%; margin: 40px">**signature_1**</td>
          </tr>
        </table>
        <br /><br /><br />
      </div>
    </body>
  </html>
  `;
};
