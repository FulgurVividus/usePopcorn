// StarRating component
// must be completely reusable

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
};

const starContainerStyle = {
  display: "flex",
  gap: "0.3rem",
};

const textStyle = {
  lineHeight: "1",
  margin: "0",
};

export default function StarRating({ maxRating = 5 }) {
  return (
    <>
      <div style={containerStyle}>
        <div style={starContainerStyle}>
          {Array.from({ length: maxRating }, (_, index) => (
            <span>S{index + 1}</span>
          ))}
        </div>
        <p style={textStyle}>10</p>
      </div>
    </>
  );
}
