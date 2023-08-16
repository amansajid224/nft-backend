import { forwardRef } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Button } from "@chakra-ui/button";
import Pagination from "@choc-ui/paginator";

export const Pageinator = ({ current, pageSize, total, onPageChange }) => {
  const Prev = forwardRef((props, ref) => (
    <Button
      ref={ref}
      {...props}
      _hover={{ color: "#fff !important", bg: "#513D7B !important" }}
    >
      <ChevronLeftIcon fontSize={"26px"} />
    </Button>
  ));
  const Next = forwardRef((props, ref) => (
    <Button
      ref={ref}
      {...props}
      _hover={{ color: "#fff !important", bg: "#513D7B !important" }}
    >
      <ChevronRightIcon fontSize={"26px"} />
    </Button>
  ));

  // const Backward = forwardRef((props, ref) => (
  //   <Button ref={ref} {...props}>
  //     ...
  //   </Button>
  // ));
  const itemRender = (_, type) => {
    if (type === "prev") {
      return Prev;
    }
    if (type === "next") {
      return Next;
    }
    // if (type === "backward") {
    //   return Backward;
    // }
    // if (type === "forward") {
    //   return Backward;
    // }
  };
  return (
    <>
      {total === undefined ||
      current === undefined ||
      pageSize === undefined ? (
        ""
      ) : (
        <Pagination
          current={current}
          onChange={(page) => {
            onPageChange(page);
          }}
          defaultPageSize={pageSize}
          total={total}
          itemRender={itemRender}
          paginationProps={{
            display: "flex",
            justifyContent: "end",
            marginBottom: "10px",
          }}
          baseStyles={{
            bg: "#1E103C",
            border: "solid 1px !important",
            borderColor: "#3B2864 !important",
            color: "#513D7B",
          }}
          activeStyles={{
            bg: "#513D7B",
            color: "#fff",
            _hover: { bg: "#513D7B", color: "#fff" },
          }}
        />
      )}
    </>
  );
};
