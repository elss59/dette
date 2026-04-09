import { useState, useMemo } from "react";
import Header from "./components/Header";
import ProductSelector from "./components/ProductSelector";
import StatsBar from "./components/StatsBar";
import FeatureList from "./components/FeatureList";
import FeatureDetail from "./components/FeatureDetail";
import { PRODUCTS, getItemsByProduct } from "./data/debtData";

const DEFAULT_FILTER = { priority: "", type: "", search: "" };

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState("ECP");
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [filter, setFilter] = useState(DEFAULT_FILTER);

  const productLabel = PRODUCTS.find((p) => p.id === selectedProduct)?.label ?? selectedProduct;
  const items = useMemo(() => getItemsByProduct(selectedProduct), [selectedProduct]);

  const handleProductSelect = (productId) => {
    setSelectedProduct(productId);
    setSelectedFeature(null);
    setFilter(DEFAULT_FILTER);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-50">
      <Header />
      <ProductSelector selected={selectedProduct} onSelect={handleProductSelect} />

      <div className="flex flex-1 overflow-hidden">
        {/* Left panel — feature list */}
        <div className="w-80 flex-shrink-0 border-r border-slate-200 bg-white flex flex-col overflow-hidden shadow-sm">
          <StatsBar items={items} productLabel={productLabel} />
          <FeatureList
            items={items}
            selected={selectedFeature}
            onSelect={setSelectedFeature}
            filter={filter}
            onFilterChange={setFilter}
          />
        </div>

        {/* Right panel — detail */}
        <FeatureDetail
          item={selectedFeature}
          allItems={items}
          onNavigate={setSelectedFeature}
        />
      </div>
    </div>
  );
}
