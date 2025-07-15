
import React, { useState, useEffect } from 'react';
import { Calculator, Settings, Ruler } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CalculationInputs {
  brand: string;
  width: number;
  depth: number;
  bendHeight: number;
  wireDiameter: number;
}

const WireCalculator = () => {
  const [inputs, setInputs] = useState<CalculationInputs>({
    brand: '',
    width: 0,
    depth: 0,
    bendHeight: 0,
    wireDiameter: 0
  });

  const [results, setResults] = useState({
    wireSize: 0,
    sheetSize: 0
  });

  // Calculate results whenever inputs change
  useEffect(() => {
    if (inputs.width > 0 && inputs.depth > 0 && inputs.bendHeight > 0 && inputs.wireDiameter > 0) {
      // Wire size formula: (width + depth) * 2 - 45
      const wireSize = (inputs.width + inputs.depth) * 2 - 45;
      
      // Sheet size formula: (width - (wireDiameter * 2)) + (bendHeight * 2) - wireDiameter
      const sheetSize = (inputs.width - (inputs.wireDiameter * 2)) + (inputs.bendHeight * 2) - inputs.wireDiameter;
      
      setResults({
        wireSize: Math.max(0, wireSize), // Ensure no negative values
        sheetSize: Math.max(0, sheetSize)
      });
    } else {
      setResults({ wireSize: 0, sheetSize: 0 });
    }
  }, [inputs]);

  const brandHeights = {
    'lifetime': 30,
    'godrej': 25,
    'higloss': 50,
    'pluss': 30
  };

  const cutleryData = {
    'lifetime': [
      { size: '15"', partitions: [{ length: 366, qty: 3 }] },
      { size: '17"', partitions: [{ length: 366, qty: 2 }, { length: 471, qty: 1 }] },
      { size: '19"', partitions: [{ length: 366, qty: 1 }, { length: 350, qty: 1 }, { length: 491, qty: 1 }] },
      { size: '21"', partitions: [{ length: 366, qty: 1 }, { length: 386, qty: 1 }, { length: 491, qty: 1 }] }
    ],
    'pluss': [
      { size: '15"', partitions: [{ length: 366, qty: 3 }] },
      { size: '17"', partitions: [{ length: 366, qty: 2 }, { length: 471, qty: 1 }] },
      { size: '19"', partitions: [{ length: 366, qty: 1 }, { length: 350, qty: 1 }, { length: 491, qty: 1 }] },
      { size: '21"', partitions: [{ length: 366, qty: 1 }, { length: 386, qty: 1 }, { length: 491, qty: 1 }] }
    ],
    'godrej': [],
    'higloss': []
  };

  const handleInputChange = (field: keyof CalculationInputs, value: string | number) => {
    if (field === 'brand') {
      const brandKey = value.toString().toLowerCase();
      const ringHeight = brandHeights[brandKey as keyof typeof brandHeights];
      
      setInputs(prev => ({
        ...prev,
        brand: value.toString(),
        bendHeight: ringHeight || prev.bendHeight
      }));
    } else {
      setInputs(prev => ({
        ...prev,
        [field]: parseFloat(value.toString()) || 0
      }));
    }
  };

  const brands = ['Godrej', 'Lifetime', 'Higloss', 'Pluss'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Wire Ring Calculator</h1>
          </div>
          <p className="text-gray-600 text-lg">Professional wire and sheet size calculator for manufacturing</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Calculation Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Brand Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Brand Selection</Label>
                <Select onValueChange={(value) => handleInputChange('brand', value)}>
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors">
                    <SelectValue placeholder="Select a brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map(brand => (
                      <SelectItem key={brand} value={brand.toLowerCase()}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {inputs.brand && (
                  <p className="text-xs text-blue-600 mt-1">
                    Ring height automatically set to {brandHeights[inputs.brand as keyof typeof brandHeights]}mm for {inputs.brand.charAt(0).toUpperCase() + inputs.brand.slice(1)}
                  </p>
                )}
              </div>

              {/* Measurement Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Width (mm)</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.1"
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    placeholder="Enter width"
                    onChange={(e) => handleInputChange('width', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Depth (mm)</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.1"
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    placeholder="Enter depth"
                    onChange={(e) => handleInputChange('depth', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Bend Height (mm)</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.1"
                    value={inputs.bendHeight || ''}
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    placeholder="Enter bend height"
                    onChange={(e) => handleInputChange('bendHeight', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Wire Diameter (mm)</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.1"
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    placeholder="Enter diameter"
                    onChange={(e) => handleInputChange('wireDiameter', e.target.value)}
                  />
                </div>
              </div>

              {/* Formula Display */}
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-gray-800 mb-2">Calculation Formulas:</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Wire Size:</strong> (Width + Depth) × 2 - 45</p>
                  <p><strong>Sheet Size:</strong> (Width - Wire Diameter × 2) + (Bend Height × 2) - Wire Diameter</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Ruler className="w-5 h-5" />
                Calculation Results
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {inputs.brand && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-600 font-medium">Selected Brand</p>
                  <p className="text-xl font-bold text-blue-800 capitalize">{inputs.brand}</p>
                </div>
              )}

              <div className="space-y-6">
                {/* Wire Size Result */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Wire Size Required</h3>
                      <p className="text-sm text-gray-600">Length of wire needed for the ring</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-orange-600">
                        {results.wireSize.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">mm</p>
                    </div>
                  </div>
                </div>

                {/* Sheet Size Result */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Sheet Size Required</h3>
                      <p className="text-sm text-gray-600">Calculated sheet dimension</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-green-600">
                        {results.sheetSize.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">mm</p>
                    </div>
                  </div>
                </div>

                {/* Input Summary */}
                {(inputs.width > 0 || inputs.depth > 0 || inputs.bendHeight > 0 || inputs.wireDiameter > 0) && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-3">Input Summary</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Width:</span>
                        <span className="font-medium">{inputs.width} mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Depth:</span>
                        <span className="font-medium">{inputs.depth} mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bend Height:</span>
                        <span className="font-medium">{inputs.bendHeight} mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Wire Diameter:</span>
                        <span className="font-medium">{inputs.wireDiameter} mm</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Cutlery Partition Table */}
          {inputs.brand && cutleryData[inputs.brand as keyof typeof cutleryData].length > 0 && (
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Cutlery Partition Table
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {cutleryData[inputs.brand as keyof typeof cutleryData].map((cutlery, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">{cutlery.size} Cutlery</h4>
                      <div className="space-y-2">
                        {cutlery.partitions.map((partition, partIndex) => (
                          <div key={partIndex} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                            <span className="text-sm font-medium text-gray-700">
                              Length: {partition.length}mm
                            </span>
                            <span className="text-sm font-bold text-blue-600">
                              Qty: {partition.qty}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>Professional wire ring calculator for manufacturing processes</p>
        </div>
      </div>
    </div>
  );
};

export default WireCalculator;
