const experiments = [
  {
    "id": 1,
    "name": "水准仪的认识和使用",
    "fill": "实验指导填写（供查看）/1-水准仪的认识、使用.pdf",
    "guide": "实验指导pdf/实验1：水准仪的认识和使用.pdf"
  },
  {
    "id": 2,
    "name": "普通水准测量",
    "fill": "实验指导填写（供查看）/2-普通水准测量.pdf",
    "guide": "实验指导pdf/实验2：普通水准测量.pdf"
  },
  {
    "id": 3,
    "name": "水准仪的检验与校正",
    "fill": "实验指导填写（供查看）/3-水准仪检校.pdf",
    "guide": "实验指导pdf/实验3：水准仪的检验与校正.pdf",
    "videos": [
      {
        "title": "水准仪水准管轴平行于视准轴的检验与校正",
        "file": "实验指导视频/水准仪水准管轴平行于视准轴的检验与校正.mp4"
      }
    ]
  },
  {
    "id": 4,
    "name": "经纬仪的认识与使用",
    "fill": "实验指导填写（供查看）/4-经纬仪的认识与使用.pdf",
    "guide": "实验指导pdf/实验4：经纬仪的认识与使用.pdf",
    "videos": [
      {
        "title": "经纬仪的认识与使用",
        "file": "实验指导视频/经纬仪的认识与使用.mp4"
      }
    ]
  },
  {
    "id": 5,
    "name": "水平角观测（测回法）",
    "fill": "实验指导填写（供查看）/5-水平角观测（测回法）.pdf",
    "guide": "实验指导pdf/实验5：水平角度测量（测回法）.pdf"
  },
  {
    "id": 6,
    "name": "竖直角测量",
    "fill": "实验指导填写（供查看）/6-竖直角测量.pdf",
    "guide": "实验指导pdf/实验6：竖直角度测量.pdf"
  },
  {
    "id": 7,
    "name": "视距测量",
    "fill": "实验指导填写（供查看）/7-视距测量.pdf",
    "guide": "实验指导pdf/实验7：视距测量.pdf"
  },
  {
    "id": 8,
    "name": "经纬仪检验与校正",
    "fill": "实验指导填写（供查看）/8-经纬仪检验与校正.pdf",
    "guide": "实验指导pdf/实验8：经纬仪的检验与校正.pdf",
    "videos": [
      {
        "title": "经纬仪视准轴垂直横轴的检验与校正",
        "file": "实验指导视频/经纬仪视准轴垂直横轴的检验与校正.mp4"
      },
      {
        "title": "经纬仪横轴垂直于数轴的检验与校正",
        "file": "实验指导视频/经纬仪横轴垂直于数轴的检验与校正.mp4"
      }
    ]
  },
  {
    "id": 9,
    "name": "全站仪的认识与使用",
    "fill": "实验指导填写（供查看）/9-全站仪的认识与使用.pdf",
    "guide": "实验指导pdf/实验9：全站仪的认识与使用.pdf"
  },
  {
    "id": 10,
    "name": "RTK的认识与使用",
    "fill": "实验指导填写（供查看）/10-RTK的认识与使用.pdf",
    "guide": "实验指导pdf/实验10：RTK的认识与使用.pdf"
  },
  {
    "id": 11,
    "name": "施工测量放样",
    "fill": "实验指导填写（供查看）/11-施工测量放样.pdf",
    "guide": "实验指导pdf/实验11：施工放样测量.pdf"
  }
];
const topControlMap = "实验指导填写（供查看）/控制点位图.pdf";
const bottomKnownPoints = "实验指导pdf/呈贡校区已知控制点.pdf";
const imagePdfMap = {
  "实验指导pdf/呈贡校区已知控制点.pdf": {
    "title": "呈贡校区已知控制点",
    "pages": [
      "pdf_images/doc_01/page-1.jpg",
      "pdf_images/doc_01/page-2.jpg"
    ]
  },
  "实验指导pdf/实验10：RTK的认识与使用.pdf": {
    "title": "实验10：RTK的认识与使用",
    "pages": [
      "pdf_images/doc_02/page-1.jpg",
      "pdf_images/doc_02/page-2.jpg",
      "pdf_images/doc_02/page-3.jpg"
    ]
  },
  "实验指导pdf/实验11：施工放样测量.pdf": {
    "title": "实验11：施工放样测量",
    "pages": [
      "pdf_images/doc_03/page-1.jpg",
      "pdf_images/doc_03/page-2.jpg"
    ]
  },
  "实验指导pdf/实验1：水准仪的认识和使用.pdf": {
    "title": "实验1：水准仪的认识和使用",
    "pages": [
      "pdf_images/doc_04/page-1.jpg"
    ]
  },
  "实验指导pdf/实验2：普通水准测量.pdf": {
    "title": "实验2：普通水准测量",
    "pages": [
      "pdf_images/doc_05/page-1.jpg"
    ]
  },
  "实验指导pdf/实验3：水准仪的检验与校正.pdf": {
    "title": "实验3：水准仪的检验与校正",
    "pages": [
      "pdf_images/doc_06/page-1.jpg"
    ]
  },
  "实验指导pdf/实验4：经纬仪的认识与使用.pdf": {
    "title": "实验4：经纬仪的认识与使用",
    "pages": [
      "pdf_images/doc_07/page-1.jpg",
      "pdf_images/doc_07/page-2.jpg"
    ]
  },
  "实验指导pdf/实验5：水平角度测量（测回法）.pdf": {
    "title": "实验5：水平角度测量（测回法）",
    "pages": [
      "pdf_images/doc_08/page-1.jpg"
    ]
  },
  "实验指导pdf/实验6：竖直角度测量.pdf": {
    "title": "实验6：竖直角度测量",
    "pages": [
      "pdf_images/doc_09/page-1.jpg"
    ]
  },
  "实验指导pdf/实验7：视距测量.pdf": {
    "title": "实验7：视距测量",
    "pages": [
      "pdf_images/doc_10/page-1.jpg"
    ]
  },
  "实验指导pdf/实验8：经纬仪的检验与校正.pdf": {
    "title": "实验8：经纬仪的检验与校正",
    "pages": [
      "pdf_images/doc_11/page-1.jpg",
      "pdf_images/doc_11/page-2.jpg",
      "pdf_images/doc_11/page-3.jpg"
    ]
  },
  "实验指导pdf/实验9：全站仪的认识与使用.pdf": {
    "title": "实验9：全站仪的认识与使用",
    "pages": [
      "pdf_images/doc_12/page-1.jpg",
      "pdf_images/doc_12/page-2.jpg",
      "pdf_images/doc_12/page-3.jpg"
    ]
  },
  "实验指导填写（供查看）/1-水准仪的认识、使用.pdf": {
    "title": "1-水准仪的认识、使用",
    "pages": [
      "pdf_images/doc_13/page-1.jpg"
    ]
  },
  "实验指导填写（供查看）/10-RTK的认识与使用.pdf": {
    "title": "10-RTK的认识与使用",
    "pages": [
      "pdf_images/doc_14/page-1.jpg"
    ]
  },
  "实验指导填写（供查看）/11-施工测量放样.pdf": {
    "title": "11-施工测量放样",
    "pages": [
      "pdf_images/doc_15/page-1.jpg"
    ]
  },
  "实验指导填写（供查看）/2-普通水准测量.pdf": {
    "title": "2-普通水准测量",
    "pages": [
      "pdf_images/doc_16/page-1.jpg",
      "pdf_images/doc_16/page-2.jpg",
      "pdf_images/doc_16/page-3.jpg"
    ]
  },
  "实验指导填写（供查看）/3-水准仪检校.pdf": {
    "title": "3-水准仪检校",
    "pages": [
      "pdf_images/doc_17/page-1.jpg"
    ]
  },
  "实验指导填写（供查看）/4-经纬仪的认识与使用.pdf": {
    "title": "4-经纬仪的认识与使用",
    "pages": [
      "pdf_images/doc_18/page-1.jpg"
    ]
  },
  "实验指导填写（供查看）/5-水平角观测（测回法）.pdf": {
    "title": "5-水平角观测（测回法）",
    "pages": [
      "pdf_images/doc_19/page-1.jpg"
    ]
  },
  "实验指导填写（供查看）/6-竖直角测量.pdf": {
    "title": "6-竖直角测量",
    "pages": [
      "pdf_images/doc_20/page-1.jpg"
    ]
  },
  "实验指导填写（供查看）/7-视距测量.pdf": {
    "title": "7-视距测量",
    "pages": [
      "pdf_images/doc_21/page-1.jpg"
    ]
  },
  "实验指导填写（供查看）/8-经纬仪检验与校正.pdf": {
    "title": "8-经纬仪检验与校正",
    "pages": [
      "pdf_images/doc_22/page-1.jpg"
    ]
  },
  "实验指导填写（供查看）/9-全站仪的认识与使用.pdf": {
    "title": "9-全站仪的认识与使用",
    "pages": [
      "pdf_images/doc_23/page-1.jpg",
      "pdf_images/doc_23/page-2.jpg"
    ]
  },
  "实验指导填写（供查看）/控制点位图.pdf": {
    "title": "控制点位图",
    "pages": [
      "pdf_images/doc_24/page-1.jpg"
    ]
  }
};
