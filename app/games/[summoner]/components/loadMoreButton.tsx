// components/LoadMoreButton.js

import { useState } from "react";

const LoadMoreButton = ({ loadMore }: any) => {
    return (
        <button onClick={loadMore} style={{ marginTop: "20px" }}>
            더보기
        </button>
    );
};

export default LoadMoreButton;
