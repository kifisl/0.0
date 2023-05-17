// import Head from "next/head";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import { useState, useEffect } from "react";
// import Product from "@/components/products";
// import DefaultLayout from "@/components/layouts/defaultLayout";
// import { Row } from "react-bootstrap";
// import Link from "next/link";

// export const getServerSideProps = async () => {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/product/getPag`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         offset: 0,
//         take: 3,
//       }),
//     }
//   );
//   const content = await response.json();
//   return {
//     props: { data: content },
//   };
// };

// export default function Home({ data }) {
//   return (
//     <DefaultLayout>
//       <Row>
//         <div className="d-flex">
//           {data.result.map((obj, i) => (
//             <Product {...obj} key={i} />
//           ))}
//         </div>
//       </Row>
//     </DefaultLayout>
//   );
// }
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Product from "@/components/products";
import DefaultLayout from "@/components/layouts/defaultLayout";
import { Row, Col, ButtonGroup } from "react-bootstrap";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";

export const getServerSideProps = async ({ query }) => {
  const currentPage = parseInt(query.page) || 1;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/product/getPag`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        offset: (currentPage - 1) * 6,
        take: 6, // Количество продуктов на странице
      }),
    }
  );
  const content = await response.json();
  return {
    props: { data: content, currentPage },
  };
};

const Home = ({ data, currentPage }) => {
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const totalCount = data.totalCount;
    const totalPages = Math.ceil(totalCount / 6); // Общее количество страниц (6 продуктов на странице)
    setTotalPages(totalPages);
  }, []);

  const handlePageChange = (page) => {
    router.push(`/?page=${page}`);
  };

  return (
    <DefaultLayout>
      <Row>
        <Col>
          <div className="pagination-container">
            {currentPage > 1 && (
              <Link href={`/home?page=${currentPage - 1}`} passHref>
                <Button variant="primary">Previous</Button>
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <Link key={index} href={`/home?page=${pageNumber}`} passHref>
                  <Button
                    variant={
                      pageNumber === currentPage ? "primary" : "outline-primary"
                    }
                  >
                    {pageNumber}
                  </Button>
                </Link>
              );
            })}
            {currentPage < totalPages && (
              <Link href={`/home?page=${currentPage + 1}`} passHref>
                <Button variant="primary">Next</Button>
              </Link>
            )}
          </div>
        </Col>
      </Row>
      <Row>
        <div className="d-flex flex-wrap">
          {data.result.map((obj, i) => (
            <Col key={i} xs={12} sm={6} md={4}>
              <Product {...obj} />
            </Col>
          ))}
        </div>
      </Row>
    </DefaultLayout>
  );
};

export default Home;
