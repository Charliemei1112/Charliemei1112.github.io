// Team color configurations - All 10 F1 constructors with authentic brand colors
const teamConfigs = {
    'sauber': {
        primaryColor: '#00A550', // Official Sauber Green (similar to Ferrari's green accent)
        fillColor: 'rgba(0, 165, 80, 0.25)',
        gridColor: '#666666',
        backgroundColor: '#000000',
        dataFile: 'assets/Sauber.json',
        canvasId: 'telemetryChartSauber',
        teamName: 'SAUBER'
    },
    'haas': {
        primaryColor: '#ED1C24', // Official Haas Red - vibrant Ferrari-style red
        fillColor: 'rgba(237, 28, 36, 0.25)',
        gridColor: '#666666',
        backgroundColor: '#000000',
        dataFile: 'assets/Haas.json',
        canvasId: 'telemetryChartHaas',
        teamName: 'HAAS'
    },
    'rb': {
        primaryColor: '#4682C6', // Racing Blue (brighter than previous)
        fillColor: 'rgba(70, 130, 198, 0.25)',
        gridColor: '#666666',
        backgroundColor: '#000000',
        dataFile: 'assets/RB.json',
        canvasId: 'telemetryChartRB',
        teamName: 'RB'
    },
    'williams': {
        primaryColor: '#0082E6', // Williams Racing Blue - brighter and more vibrant
        fillColor: 'rgba(0, 130, 230, 0.25)',
        gridColor: '#666666',
        backgroundColor: '#000000',
        dataFile: 'assets/Williams.json',
        canvasId: 'telemetryChartWilliams',
        teamName: 'WILLIAMS'
    },
    'alpine': {
        primaryColor: '#0090E0', // Alpine Blue - electric blue tone
        fillColor: 'rgba(0, 144, 224, 0.25)',
        gridColor: '#666666',
        backgroundColor: '#000000',
        dataFile: 'assets/Alpine.json',
        canvasId: 'telemetryChartAlpine',
        teamName: 'ALPINE'
    },
    'astonmartin': {
        primaryColor: '#00594F', // Official Aston Martin Racing Green - deeper green
        fillColor: 'rgba(0, 89, 79, 0.25)',
        gridColor: '#666666',
        backgroundColor: '#000000',
        dataFile: 'assets/AstonMartin.json',
        canvasId: 'telemetryChartAstonMartin',
        teamName: 'ASTON MARTIN'
    },
    'mercedes': {
        primaryColor: '#00D2BE', // Official Mercedes Petronas Teal - kept as is (perfect)
        fillColor: 'rgba(0, 210, 190, 0.25)',
        gridColor: '#666666',
        backgroundColor: '#000000',
        dataFile: 'assets/Mercedes.json',
        canvasId: 'telemetryChartMercedes',
        teamName: 'MERCEDES'
    },
    'ferrari': {
        primaryColor: '#EF1A2D', // Official Ferrari Red (Pantone 185 C) - more vibrant
        fillColor: 'rgba(239, 26, 45, 0.25)',
        gridColor: '#666666',
        backgroundColor: '#000000',
        dataFile: 'assets/Ferrari.json',
        canvasId: 'telemetryChartFerrari',
        teamName: 'FERRARI'
    },
    'mclaren': {
        primaryColor: '#FF8700', // Official McLaren Papaya Orange (Pantone 151 C)
        fillColor: 'rgba(255, 135, 0, 0.25)',
        gridColor: '#666666',
        backgroundColor: '#000000',
        dataFile: 'assets/McLaren.json',
        canvasId: 'telemetryChartMcLaren',
        teamName: 'MCLAREN'
    },
    'redbull': {
        primaryColor: '#1E3C8C', // Official Red Bull Navy Blue - deeper, richer blue
        fillColor: 'rgba(30, 60, 140, 0.25)',
        gridColor: '#666666',
        backgroundColor: '#000000',
        dataFile: 'assets/RedBull.json',
        canvasId: 'telemetryChartRedBull',
        teamName: 'RED BULL'
    },
    'verstappen': {
        primaryColor: '#FF6D35', // Verstappen Orange - vibrant racing orange
        fillColor: 'rgba(255, 109, 53, 0.25)',
        gridColor: '#666666',
        backgroundColor: '#000000',
        dataFile: 'assets/verstappen.json',
        canvasId: 'telemetryChartVerstappen',
        teamName: 'VERSTAPPEN'
    }
};

// Track which charts have been loaded
const loadedCharts = new Set();

/**
 * Main function to draw telemetry charts with multiple teams
 * @param {string[]} teamKeys - Array of team configuration keys (e.g., ['ferrari', 'mclaren'])
 * @param {boolean[]} isEqualDistance - Array of booleans for each team (true = equal distance, false = equal time)
 * @param {string} canvasId - ID of the canvas element to draw on
 * @param {Object} options - Optional configuration for the chart
 * @param {string} options.title - Custom chart title
 * @param {boolean} options.showAreaFill - Whether to show area fill (default: true for single team, false for multiple)
 * @param {boolean} options.showLegend - Whether to show legend (default: false for single team, true for multiple)
 */
async function drawMultiTelemetryChart(teamKeys, isEqualDistance, canvasId, options = {}) {
    console.log(`Drawing multi-telemetry chart for teams: ${teamKeys.join(', ')}`);
    
    // Validate inputs
    if (!Array.isArray(teamKeys) || teamKeys.length === 0) {
        console.error('teamKeys must be a non-empty array');
        return;
    }
    
    if (!Array.isArray(isEqualDistance) || isEqualDistance.length !== teamKeys.length) {
        console.error('isEqualDistance array must have the same length as teamKeys');
        return;
    }
    
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error(`Canvas element not found: ${canvasId}`);
        return;
    }
    
    // Default options based on number of teams
    const isSingleTeam = teamKeys.length === 1;
    const defaultOptions = {
        title: isSingleTeam ? `${teamConfigs[teamKeys[0]]?.teamName || teamKeys[0].toUpperCase()} - SPEED TELEMETRY - BAHRAIN GP` 
                            : `${teamKeys.map(key => teamConfigs[key]?.teamName || key.toUpperCase()).join(' vs ')} - SPEED COMPARISON`,
        showAreaFill: isSingleTeam,
        showLegend: !isSingleTeam
    };
    
    const config = { ...defaultOptions, ...options };
    
    try {
        // Load all team data
        const teamDataPromises = teamKeys.map(teamKey => loadTeamData(teamKey));
        const teamDataResults = await Promise.all(teamDataPromises);
        
        // Validate all data loaded successfully
        for (let i = 0; i < teamDataResults.length; i++) {
            if (!teamDataResults[i]) {
                console.error(`Failed to load data for team: ${teamKeys[i]}`);
                showErrorOnCanvas(teamConfigs[teamKeys[0]], `Failed to load data for ${teamKeys[i]}`, canvas);
                return;
            }
        }
        
        console.log('All team data loaded successfully');
        
        // Draw the chart
        drawTelemetryChart(teamDataResults, teamKeys, isEqualDistance, canvas, config);
        
    } catch (error) {
        console.error('Error in drawMultiTelemetryChart:', error);
        showErrorOnCanvas(teamConfigs[teamKeys[0]], `Error: ${error.message}`, canvas);
    }
}

/**
 * Load team data from JSON file
 * @param {string} teamKey - Team configuration key
 * @returns {Promise<number[]|null>} Array of speed data or null if failed
 */
async function loadTeamData(teamKey) {
    const config = teamConfigs[teamKey];
    if (!config) {
        console.error(`Team configuration not found for: ${teamKey}`);
        return null;
    }

    try {
        console.log(`Loading data from: ${config.dataFile} for ${config.teamName}`);
        
        const response = await fetch(config.dataFile);
        if (!response.ok) {
            console.error(`Failed to fetch ${config.dataFile}: ${response.status} ${response.statusText}`);
            return null;
        }
        
        const jsonData = await response.json();
        const speedData = extractSpeedData(jsonData);
        
        if (speedData.length === 0) {
            console.error(`No valid speed data found for ${config.teamName}`);
            return null;
        }
        
        console.log(`Loaded ${speedData.length} speed data points for ${config.teamName}`);
        return speedData;
        
    } catch (error) {
        console.error(`Error loading data for ${config.teamName}:`, error);
        return null;
    }
}

/**
 * Calculate X positions for telemetry data
 * @param {number[]} speedData - Array of speed values
 * @param {boolean} isEqualDistance - true for equal distance, false for equal time
 * @returns {number[]} Normalized X positions (0-1 range)
 */
function calculateXPositions(speedData, isEqualDistance) {
    if (isEqualDistance) {
        // For distance-based data, return evenly spaced positions
        return speedData.map((_, i) => i / (speedData.length - 1));
    }
    
    // For time-based data, calculate distance = speed * time
    const timeInterval = 1; // Assuming equal time intervals
    let cumulativeDistance = 0;
    const distances = [0]; // Start at distance 0
    
    for (let i = 1; i < speedData.length; i++) {
        // Use average speed between points for distance calculation
        const avgSpeed = (speedData[i] + speedData[i-1]) / 2;
        cumulativeDistance += avgSpeed * timeInterval;
        distances.push(cumulativeDistance);
    }
    
    // Normalize to 0-1 range
    const maxDistance = distances[distances.length - 1];
    return distances.map(d => d / maxDistance);
}

/**
 * Main chart drawing function
 * @param {number[][]} teamDataArray - Array of speed data arrays for each team
 * @param {string[]} teamKeys - Array of team keys
 * @param {boolean[]} isEqualDistance - Array of distance/time flags
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {Object} config - Chart configuration
 */
function drawTelemetryChart(teamDataArray, teamKeys, isEqualDistance, canvas, config) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Canvas context not available!');
        return;
    }
    
    // Set up canvas with high DPI support
    const { width, height, chartWidth, chartHeight, margin } = setupCanvas(canvas, ctx);
    
    // Chart configuration
    const yMin = 50;
    const yMax = 350;
    const yRange = yMax - yMin;
    
    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);
    
    // Calculate X positions for each team
    const teamXPositions = teamDataArray.map((speedData, index) => 
        calculateXPositions(speedData, isEqualDistance[index])
    );
    
    // Draw area fills first (only if enabled and single team)
    if (config.showAreaFill && teamKeys.length === 1) {
        const teamConfig = teamConfigs[teamKeys[0]];
        drawAreaFill(ctx, teamDataArray[0], teamXPositions[0], teamConfig.fillColor, margin, chartWidth, chartHeight, yMin, yRange);
    }
    
    // Draw grid
    drawGrid(ctx, margin, chartWidth, chartHeight);
    
    // Draw speed lines for all teams
    teamDataArray.forEach((speedData, index) => {
        const teamConfig = teamConfigs[teamKeys[index]];
        drawSpeedLine(ctx, speedData, teamXPositions[index], teamConfig.primaryColor, margin, chartWidth, chartHeight, yMin, yRange, 1);
    });
    
    // Draw axes
    const axisColor = teamKeys.length === 1 ? teamConfigs[teamKeys[0]]?.primaryColor || '#06ffa5' : '#06ffa5';
    drawAxes(ctx, margin, chartWidth, chartHeight, axisColor);
    
    // Draw labels
    const labelColor = teamKeys.length === 1 ? teamConfigs[teamKeys[0]]?.primaryColor || '#06ffa5' : '#06ffa5';
    drawLabels(ctx, width, height, margin, chartWidth, chartHeight, yMin, yRange, config.title, labelColor);
    
    // Draw legend if enabled
    if (config.showLegend && teamKeys.length > 1) {
        drawLegend(ctx, teamKeys, width, margin);
    }
    
    console.log('Telemetry chart drawing completed');
}

/**
 * Set up canvas with proper dimensions and scaling
 */
function setupCanvas(canvas, ctx) {
    // Use higher device pixel ratio for increased resolution
    const devicePixelRatio = Math.max(window.devicePixelRatio || 1, 2); // Minimum 2x for high resolution
    const displayWidth = canvas.parentElement.clientWidth || 800;
    const displayHeight = 400;
    
    // Set actual canvas size in memory (scaled up for high resolution)
    canvas.width = displayWidth * devicePixelRatio;
    canvas.height = displayHeight * devicePixelRatio;
    
    // Scale the canvas back down using CSS
    canvas.style.width = displayWidth + 'px';
    canvas.style.height = displayHeight + 'px';
    
    // Scale the drawing context for high resolution
    ctx.scale(devicePixelRatio, devicePixelRatio);
    
    // Enable high-quality rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    // Chart margins
    const margin = { top: 40, right: 40, bottom: 60, left: 80 };
    const chartWidth = displayWidth - margin.left - margin.right;
    const chartHeight = displayHeight - margin.top - margin.bottom;
    
    return {
        width: displayWidth,
        height: displayHeight,
        chartWidth,
        chartHeight,
        margin
    };
}

/**
 * Draw area fill below the speed line
 */
function drawAreaFill(ctx, speedData, xPositions, fillColor, margin, chartWidth, chartHeight, yMin, yRange) {
    ctx.fillStyle = fillColor;
        ctx.beginPath();
        
        // Start from bottom left
        ctx.moveTo(margin.left, margin.top + chartHeight);
        
        // Draw to first speed point
    const firstX = margin.left + xPositions[0] * chartWidth;
    const firstY = margin.top + chartHeight - ((speedData[0] - yMin) / yRange) * chartHeight;
    ctx.lineTo(firstX, firstY);
        
        // Draw the speed line
    for (let i = 0; i < speedData.length; i++) {
        const x = margin.left + xPositions[i] * chartWidth;
        const y = margin.top + chartHeight - ((speedData[i] - yMin) / yRange) * chartHeight;
            ctx.lineTo(x, y);
        }
        
    // Close the path
        ctx.lineTo(margin.left + chartWidth, margin.top + chartHeight);
        ctx.lineTo(margin.left, margin.top + chartHeight);
        
        ctx.closePath();
        ctx.fill();
}

/**
 * Draw grid lines
 */
function drawGrid(ctx, margin, chartWidth, chartHeight) {
    ctx.strokeStyle = '#666666';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.6;
    
    // Horizontal grid lines
    for (let i = 0; i <= 10; i++) {
        const y = margin.top + (i / 10) * chartHeight;
        ctx.beginPath();
        ctx.moveTo(margin.left, y);
        ctx.lineTo(margin.left + chartWidth, y);
        ctx.stroke();
    }
    
    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
        const x = margin.left + (i / 10) * chartWidth;
        ctx.beginPath();
        ctx.moveTo(x, margin.top);
        ctx.lineTo(x, margin.top + chartHeight);
        ctx.stroke();
    }
    
    ctx.globalAlpha = 1;
}

/**
 * Draw speed line
 */
function drawSpeedLine(ctx, speedData, xPositions, color, margin, chartWidth, chartHeight, yMin, yRange, lineWidth = 1.5) {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    ctx.beginPath();
    for (let i = 0; i < speedData.length; i++) {
        const x = margin.left + xPositions[i] * chartWidth;
        const y = margin.top + chartHeight - ((speedData[i] - yMin) / yRange) * chartHeight;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
}

/**
 * Draw chart axes
 */
function drawAxes(ctx, margin, chartWidth, chartHeight, teamColor = '#06ffa5') {
    ctx.strokeStyle = teamColor;
    ctx.lineWidth = 2;
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, margin.top + chartHeight);
    ctx.stroke();
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top + chartHeight);
    ctx.lineTo(margin.left + chartWidth, margin.top + chartHeight);
    ctx.stroke();
}

/**
 * Draw chart labels and title
 */
function drawLabels(ctx, width, height, margin, chartWidth, chartHeight, yMin, yRange, title, teamColor = '#06ffa5') {
    ctx.fillStyle = teamColor;
    ctx.font = '12px Courier New';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    
    // Y-axis labels (speed)
    for (let i = 0; i <= 5; i++) {
        const speed = Math.round(yMin + (i / 5) * yRange);
        const y = margin.top + chartHeight - (i / 5) * chartHeight;
        ctx.fillText(`${speed}`, margin.left - 10, y + 4);
    }
    
    // X-axis labels (distance markers)
    ctx.textAlign = 'center';
    for (let i = 0; i <= 5; i++) {
        const x = margin.left + (i / 5) * chartWidth;
        const distance = Math.round((i / 5) * 100);
        ctx.fillText(`${distance}%`, x, margin.top + chartHeight + 20);
    }
    
    // Chart title
    ctx.font = '14px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText(title, width / 2, 25);
    
    // Y-axis label
    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('SPEED (KM/H)', 0, 0);
    ctx.restore();
    
    // X-axis label
    ctx.fillText('LAP PROGRESS (%)', width / 2, height - 15);
}

/**
 * Draw legend for multiple teams
 */
function drawLegend(ctx, teamKeys, width, margin) {
    // Legend disabled - no visual legend drawn on canvas
    // Team identification can be done through line colors and external HTML legend
}

// Helper function to extract speed data from various JSON formats
function extractSpeedData(jsonData) {
    let speedData = [];
    
    if (Array.isArray(jsonData)) {
        // Handle array of numbers or objects
        speedData = jsonData.map(item => {
            if (typeof item === 'number') return item;
            if (typeof item === 'object') {
                return item.speed || item.Speed || item.velocity || item.value || 0;
            }
            return 0;
        }).filter(speed => !isNaN(speed) && speed > 0);
    } else if (typeof jsonData === 'object') {
        // Handle object with various possible structures
        if (jsonData.speeds) {
            speedData = Array.isArray(jsonData.speeds) ? jsonData.speeds : [];
        } else if (jsonData.data) {
            speedData = Array.isArray(jsonData.data) ? jsonData.data : [];
        } else if (jsonData.telemetry) {
            speedData = Array.isArray(jsonData.telemetry) ? jsonData.telemetry : [];
        } else {
            // Try to extract numeric values from the object
            speedData = Object.values(jsonData).filter(val => typeof val === 'number' && val > 0);
        }
    }
    
    return speedData.filter(speed => !isNaN(speed) && speed > 0);
}

// Helper function to show error messages on canvas
function showErrorOnCanvas(config, errorMessage, canvas) {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const displayWidth = canvas.parentElement?.clientWidth || 800;
    canvas.width = displayWidth;
    canvas.height = 400;
    canvas.style.width = displayWidth + 'px';
    canvas.style.height = '400px';
    
    // Clear canvas
    ctx.fillStyle = config?.backgroundColor || '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw error message
    ctx.fillStyle = '#ff6666';
    ctx.font = '16px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText(errorMessage, canvas.width / 2, canvas.height / 2);
    if (config?.teamName) {
        ctx.fillText(`Team: ${config.teamName}`, canvas.width / 2, canvas.height / 2 + 30);
    }
}

// Table of Contents functionality
function initializeTableOfContents() {
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = document.querySelectorAll('[id$="-section"]');
    
    // Add smooth scrolling to TOC links
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Highlight active section on scroll
    function updateActiveLink() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 150; // Offset for header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });
        
        // Update active link
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', updateActiveLink);
    
    // Initial call to set active link
    updateActiveLink();
}

// Dynamic team detection function
function detectTeamFromContext(container) {
    // Try to find team key from various sources
    const teamKey = container.dataset.team || 
                   container.closest('[data-team]')?.dataset.team ||
                   container.querySelector('[data-team]')?.dataset.team ||
                   'sauber'; // fallback to sauber
    
    console.log('Detected team key:', teamKey);
    return teamKey;
}

// Enhanced Media Tab Functionality with dynamic team detection
document.addEventListener('DOMContentLoaded', function() {
    // Initialize table of contents
    initializeTableOfContents();
    
    const mediaTabsContainers = document.querySelectorAll('.media-tabs-container');
    
    mediaTabsContainers.forEach(container => {
        const tabs = container.querySelectorAll('.media-tab');
        const contents = container.querySelectorAll('.tab-content');
        
        // Detect the team for this container
        const teamKey = detectTeamFromContext(container);
        console.log(`Setting up tabs for team: ${teamKey}`);

        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Remove active class from all tabs and contents in this container
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show corresponding content - support both generic and team-specific content IDs
                let targetContent = document.getElementById(targetTab + '-content');
                if (!targetContent && targetTab === 'telemetry') {
                    // Try team-specific telemetry content ID
                    targetContent = document.getElementById(`telemetry-${teamKey}-content`);
                }
                if (!targetContent && targetTab.startsWith('telemetry')) {
                    // Try generic telemetry content
                    targetContent = document.getElementById('telemetry-content');
                }
                
                if (targetContent) {
                    targetContent.classList.add('active');
                }
                
                // Load telemetry data when telemetry tab is clicked
                if (targetTab === 'telemetry' || targetTab.startsWith('telemetry')) {
                    console.log(`Loading telemetry for team: ${teamKey}`);
                    setTimeout(() => loadTelemetryData(teamKey), 100);
                    loadedCharts.add(teamKey);
                }
            });
        });
    });
    
    // Initialize comparison chart
    initializeComparison();
});

// Updated wrapper functions for backward compatibility
async function loadTelemetryData(teamKey = 'sauber') {
    console.log(`Loading single telemetry for: ${teamKey}`);
    const config = teamConfigs[teamKey];
    if (!config) {
        console.error('Team configuration not found for:', teamKey);
        return;
    }
    
    // Use the new function with single team
    const isEqualDistance = teamKey === 'verstappen'; // Verstappen uses equal distance
    await drawMultiTelemetryChart([teamKey], [isEqualDistance], config.canvasId);
}

// Dynamic comparison chart functionality - updated to use new system
function initializeComparison() {
    const comparisonContainers = document.querySelectorAll('[data-comparison]');
    
    comparisonContainers.forEach(container => {
        const comparisonType = container.dataset.comparison;
        const [team1, team2] = comparisonType.split('-');
        
        console.log(`Setting up comparison: ${team1} vs ${team2}`);
        
        // Handle different canvas IDs for different comparisons
        let canvas;
        if (comparisonType === 'verstappen-redbull') {
            canvas = container.querySelector('#verstappenComparisonChart');
        } else {
            canvas = container.querySelector('#comparisonChart');
        }
        
        if (!canvas) {
            console.error(`Canvas not found for comparison: ${comparisonType}`);
            return;
        }
        
        // Use the new system for comparison charts
        loadComparisonChart(team1, team2, canvas.id);
    });
}

/**
 * Load and draw comparison chart using the new modular system
 * @param {string} team1Key - First team key
 * @param {string} team2Key - Second team key
 * @param {string} canvasId - Canvas element ID
 */
async function loadComparisonChart(team1Key, team2Key, canvasId) {
    console.log(`Loading comparison chart: ${team1Key} vs ${team2Key}`);
    
    // Determine data positioning for each team
    const team1IsEqualDistance = team1Key === 'verstappen';
    const team2IsEqualDistance = team2Key === 'verstappen';
    
    // Use the new multi-telemetry function
    await drawMultiTelemetryChart(
        [team1Key, team2Key], 
        [team1IsEqualDistance, team2IsEqualDistance], 
        canvasId,
        {
            showAreaFill: false,  // No area fill for comparisons
            showLegend: true      // Show legend for comparisons
        }
    );
}

/**
 * Convenience function for creating custom multi-team comparisons
 * Example usage:
 * - Single team with area fill: createCustomChart(['ferrari'], [false], 'myCanvas')
 * - Multiple teams comparison: createCustomChart(['ferrari', 'mclaren', 'redbull'], [false, false, false], 'myCanvas')
 * - Mixed data types: createCustomChart(['verstappen', 'redbull'], [true, false], 'myCanvas')
 * 
 * @param {string[]} teamKeys - Array of team keys
 * @param {boolean[]} isEqualDistance - Array of positioning flags
 * @param {string} canvasId - Canvas element ID
 * @param {Object} options - Optional chart configuration
 */
async function createCustomChart(teamKeys, isEqualDistance, canvasId, options = {}) {
    console.log(`Creating custom chart with teams: ${teamKeys.join(', ')}`);
    return await drawMultiTelemetryChart(teamKeys, isEqualDistance, canvasId, options);
}

// Legacy function for backward compatibility - updated to use new system
async function loadComparisonData(team1Key, team2Key, canvas) {
    console.log(`Legacy loadComparisonData called for ${team1Key} vs ${team2Key}`);
    await loadComparisonChart(team1Key, team2Key, canvas.id);
}

// Remove old comparison functions that are no longer needed
// The following functions are replaced by the new modular system:
// - drawComparisonChart (replaced by drawMultiTelemetryChart)
// - normalizeDataset (no longer needed with new positioning system)
// - showComparisonError (replaced by showErrorOnCanvas)

/* ===== USAGE EXAMPLES =====
 * 
 * The new modular system allows for flexible telemetry chart creation:
 * 
 * 1. Single team chart with area fill (individual team analysis):
 *    await drawMultiTelemetryChart(['ferrari'], [false], 'myCanvas');
 * 
 * 2. Two team comparison (like current Ferrari vs McLaren):
 *    await drawMultiTelemetryChart(['ferrari', 'mclaren'], [false, false], 'comparisonCanvas');
 * 
 * 3. Real vs Game comparison (Verstappen vs Red Bull):
 *    await drawMultiTelemetryChart(['verstappen', 'redbull'], [true, false], 'realVsGameCanvas');
 * 
 * 4. Multi-team comparison (3+ teams):
 *    await drawMultiTelemetryChart(['ferrari', 'mclaren', 'redbull'], [false, false, false], 'multiCanvas');
 * 
 * 5. Custom options:
 *    await drawMultiTelemetryChart(['ferrari'], [false], 'myCanvas', {
 *        title: 'Custom Ferrari Analysis',
 *        showAreaFill: true,
 *        showLegend: false
 *    });
 * 
 * 6. Using the convenience function:
 *    await createCustomChart(['mercedes', 'astonmartin'], [false, false], 'mercedesVsAston');
 * 
 * Parameters:
 * - teamKeys: Array of team configuration keys from teamConfigs
 * - isEqualDistance: Array of booleans (true = equal distance spacing, false = equal time spacing)
 * - canvasId: HTML canvas element ID
 * - options: Optional configuration object
 * 
 * Available team keys: 'sauber', 'haas', 'rb', 'williams', 'alpine', 'astonmartin', 
 *                     'mercedes', 'ferrari', 'mclaren', 'redbull', 'verstappen'
 * 
 * Data positioning:
 * - false (equal time): Game telemetry data - spacing based on speed×time (realistic lap progress)
 * - true (equal distance): Real telemetry data - evenly spaced points along track distance
 * 
 * The system automatically:
 * - Uses team colors from teamConfigs
 * - Handles data loading and error states
 * - Provides appropriate titles and legends
 * - Supports high DPI displays
 * - Maintains consistent styling
 */
