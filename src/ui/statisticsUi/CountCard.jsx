import React, { useEffect } from "react";
import PropTypes from "prop-types"; // For prop type validation

const CountCard = ({ title, count, Icon, iconSize, animationDuration, mainColor, darkMode }) => {


  const formatNumber = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value;
  };

  // Default main color
  const defaultMainColor = "#7d224b";

  // Dynamic styles
  const styles = {
    card: {
      backgroundColor: darkMode ? "#333333" : "#ffffff",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      borderRadius: "12px",
      padding: "24px",
      width: "320px",
      height: "192px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    icon: {
      color: mainColor || defaultMainColor,
      marginBottom: "16px",
    },
    title: {
      color: darkMode ? "#fbfbfb" : "#595858",
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "8px",
      fontWeight: "bold",

    },
    count: {
      color: mainColor || defaultMainColor,
      fontSize: "32px",
      fontWeight: "700",
    },
  };

  return (
    <div
      data-aos="fade-up"
      style={styles.card}
      className="hover:scale-105 hover:shadow-xl" // Hover effect
    >
      {/* Icon Section */}
      <div style={styles.icon}>
        <Icon size={iconSize || "2.5rem"} />
      </div>

      {/* Title Section */}
      <div style={styles.title}>{title}</div>

      {/* CountUp with formatted number */}
      <div style={styles.count}>
     
      </div>
    </div>
  );
};

// Prop type validation
CountCard.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  Icon: PropTypes.elementType.isRequired,
  iconSize: PropTypes.string,
  animationDuration: PropTypes.number,
  mainColor: PropTypes.string,
  darkMode: PropTypes.bool,
};

// Default props
CountCard.defaultProps = {
  iconSize: "2.5rem",
  animationDuration: 2,
  mainColor: "#7d224b",
  darkMode: false,
};

export default CountCard;